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

  const handleCreate = async (taskData) => {
    await createTask(taskData)
    setShowForm(false)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header 
        title="Tasks" 
        subtitle="Manage your tasks"
        buttonText={showForm ? 'Cancel' : 'Add Task'}
        onButtonClick={() => setShowForm(!showForm)}
      />

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <TaskForm 
            onSubmit={handleCreate} 
            categories={categories} 
          />
        </div>
      )}

      <div>
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-beige-600">No tasks yet. Create your first task!</p>
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