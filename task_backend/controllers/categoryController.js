
import Category from "../models/categoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    console.log("Received createCategory request");
    console.log("Request body:", req.body);
    console.log("User from auth middleware:", req.user);

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const exists = await Category.findOne({ name, owner: req.user._id }); // note _id not id
    if (exists) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = new Category({
      name: name.trim(),
      owner: req.user._id, 
    });

    const saved = await category.save();
    res.status(201).json({ success: true, category: saved });
  } catch (err) {
    console.error("Error in createCategory:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all categories 
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a  category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, owner: req.user.id });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Category not found or not yours" });
    }

    res.json({ success: true, category: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found or not yours" });
    }

    res.json({ success: true, category: deleted, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
