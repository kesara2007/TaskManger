import { useState } from 'react'
import { format } from 'date-fns'
import TaskForm from './TaskForm'

const TaskItem = ({ task, onUpdate, onDelete, categories }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async (updatedData) => {
    await onUpdate(task._id, updatedData)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task._id)
    setIsDeleting(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          categories={categories}
        />
      </div>
    )
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow mb-4 border-l-4 ${
      task.priority === 'High' ? 'border-red-500' : 
      task.priority === 'Medium' ? 'border-yellow-500' : 'border-green-500'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-beige-500' : 'text-navy-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-beige-700 mt-1">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {task.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-beige-100 text-beige-800">
                {task.category.name}
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-800">
              {task.priority} Priority
            </span>
            {task.dueDate && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                new Date(task.dueDate) < new Date() && !task.completed
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            )}
            {task.completed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem