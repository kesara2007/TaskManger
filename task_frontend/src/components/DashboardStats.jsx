// components/DashboardStats.jsx
import { Link } from 'react-router-dom'

const DashboardStats = ({ tasks, categories }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter(
    task => !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
  ).length
  const totalCategories = categories.length

  const stats = [
    { 
      name: 'Total Tasks', 
      value: totalTasks, 
      color: 'bg-navy-600',
      link: '/tasks'
    },
    { 
      name: 'Completed', 
      value: completedTasks, 
      color: 'bg-green-500',
      link: '/tasks?filter=completed'
    },
    { 
      name: 'Pending', 
      value: pendingTasks, 
      color: 'bg-yellow-500',
      link: '/tasks?filter=pending'
    },
    { 
      name: 'Overdue', 
      value: overdueTasks, 
      color: 'bg-red-500',
      link: '/tasks?filter=overdue'
    },
    { 
      name: 'Categories', 
      value: totalCategories, 
      color: 'bg-beige-600',
      link: '/categories'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <Link 
          key={stat.name} 
          to={stat.link}
          className={`${stat.color} rounded-lg shadow p-6 text-white hover:opacity-90 transition`}
        >
          <h3 className="text-sm font-medium opacity-80">{stat.name}</h3>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </Link>
      ))}
    </div>
  )
}

export default DashboardStats