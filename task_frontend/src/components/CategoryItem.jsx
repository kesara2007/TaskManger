import { useState } from 'react'
import CategoryForm from './CategoryForm'

const CategoryItem = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async (updatedData) => {
    await onUpdate(category._id, updatedData)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(category._id)
    setIsDeleting(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <CategoryForm
          initialData={category}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg text-navy-800">{category.name}</h3>
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

export default CategoryItem