import Task from "../models/taskModel.js";

//Create a New task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed, category } = req.body;
    const task = new Task({
      title: title.trim(),
      description: description || "",
      category: category || null, 
      priority: priority || "Low", 
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: completed === true || completed === "true",
      owner: req.user.id,
    });
    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get All Task for Logged in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id })
      .sort({ createdAt: -1 })
      .populate("category", "name");
    res.json({ success: true, tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get Single Task by ID 
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    }).populate("category", "name");
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update a task
export const updateTask = async (req, res) => {
  try {
    console.log("🛠️ Update Request Triggered");
    console.log("Task ID:", req.params.id);
    console.log("User ID:", req.user.id);
    console.log("Request Body:", req.body);

    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === "Yes" || data.completed === "true";
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or not yours" });
    }

    res.json({ success: true, task: updated });
  } catch (err) {
    console.error("❌ Update Task Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


//Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or not yours" });
    }
    res.json({ success: true, task: deleted, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
