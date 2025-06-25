import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import CategoryItem from '../components/CategoryItem'
import LoadingSpinner from '../components/LoadingSpinner'

const Categories = () => {
  const { categories, isLoading, error, createCategory, updateCategory, deleteCategory } = useCategories()
  console.log(categories)
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (categoryData) => {
    await createCategory(categoryData)
    setShowForm(false)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header 
        title="Categories" 
        subtitle="Organize your tasks with categories"
        buttonText={showForm ? 'Cancel' : 'Add Category'}
        onButtonClick={() => setShowForm(!showForm)}
      />

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <CategoryForm onSubmit={handleCreate} />
        </div>
      )}

      <div>
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-beige-600">No categories yet. Create your first category!</p>
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