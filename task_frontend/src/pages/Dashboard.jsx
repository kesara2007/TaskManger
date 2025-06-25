import { useTasks } from '../hooks/useTasks'
import { useCategories } from '../hooks/useCategories'
import DashboardStats from '../components/DashboardStats'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const { tasks, isLoading: tasksLoading } = useTasks()
  const { categories, isLoading: catsLoading } = useCategories()

  if (tasksLoading || catsLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Overview of your tasks and categories" 
      />
      <DashboardStats tasks={tasks} categories={categories} />
    </div>
  )
}

export default Dashboard