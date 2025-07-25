// pages/Tasks.jsx
import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useCategories } from '../hooks/useCategories'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import LoadingSpinner from '../components/LoadingSpinner'

const Tasks = () => {
  const { tasks, isLoading, error, createTask, updateTask, deleteTask } = useTasks()
  const { categories } = useCategories()
  const [showForm, setShowForm] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const handleCreate = async (taskData) => {
    const result = await createTask(taskData)
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
        title="Tasks" 
        subtitle="Manage your tasks"
        buttonText={showForm ? 'Cancel' : '+ New Task'}
        onButtonClick={() => setShowForm(!showForm)}
      />

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <TaskForm 
            onSubmit={handleCreate} 
            onCancel={() => setShowForm(false)}
            categories={categories}
          />
        </div>
      )}

      <div className="flex space-x-2 mb-4">
        {/* Filter buttons remain the same */}
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-beige-600">No tasks yet. Create your first task!</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm text-sm font-medium transition-colors"
            >
              + New Task
            </button>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              categories={categories}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Tasks