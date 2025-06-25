import { useState } from 'react'
import { PRIORITY_OPTIONS } from '../utils/constants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const TaskForm = ({ initialData = {}, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category?._id || '',
    priority: initialData.priority || 'Low',
    dueDate: initialData.dueDate ? new Date(initialData.dueDate) : null,
    completed: initialData.completed || false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-beige-700">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-beige-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-beige-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">No category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-beige-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            {PRIORITY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-beige-700">
            Due Date
          </label>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md border-beige-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            dateFormat="MMMM d, yyyy"
            isClearable
            placeholderText="Select a date"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 rounded border-beige-300 text-yellow-600 focus:ring-yellow-500"
          />
          <label htmlFor="completed" className="ml-2 block text-sm text-beige-700">
            Completed
          </label>
        </div>
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
          {initialData._id ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm