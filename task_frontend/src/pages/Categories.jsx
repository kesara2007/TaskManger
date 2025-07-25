// pages/Categories.jsx
import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import CategoryItem from '../components/CategoryItem'
import LoadingSpinner from '../components/LoadingSpinner'

const Categories = () => {
  const { categories, isLoading, error, createCategory, updateCategory, deleteCategory } = useCategories()
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (categoryData) => {
    const result = await createCategory(categoryData)
    if (result.success) {
      setShowForm(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header 
        title="Categories" 
        subtitle="Organize your tasks with categories"
        buttonText={showForm ? 'Cancel' : '+ New Category'}
        onButtonClick={() => setShowForm(!showForm)}
      />

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <CategoryForm 
            onSubmit={handleCreate} 
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-beige-600">No categories yet. Create your first category!</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm text-sm font-medium transition-colors"
            >
              + New Category
            </button>
          </div>
        ) : (
          categories.map(category => (
            <CategoryItem
              key={category._id}
              category={category}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Categories