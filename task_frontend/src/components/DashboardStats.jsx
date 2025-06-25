const DashboardStats = ({ tasks, categories }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter(
    task => !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
  ).length
  const totalCategories = categories.length

  const stats = [
    { name: 'Total Tasks', value: totalTasks, color: 'bg-navy-600' },
    { name: 'Completed', value: completedTasks, color: 'bg-green-500' },
    { name: 'Pending', value: pendingTasks, color: 'bg-yellow-500' },
    { name: 'Overdue', value: overdueTasks, color: 'bg-red-500' },
    { name: 'Categories', value: totalCategories, color: 'bg-beige-600' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className={`${stat.color} rounded-lg shadow p-6 text-white`}>
          <h3 className="text-sm font-medium opacity-80">{stat.name}</h3>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats