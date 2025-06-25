import { useState } from 'react'

const CategoryForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Category name is required')
      return
    }
    onSubmit({ name: name.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-beige-700">
          Category Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
          className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-beige-300 rounded-md shadow-sm text-sm font-medium text-beige-700 hover:bg-beige-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          {initialData._id ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  )
}

export default CategoryForm