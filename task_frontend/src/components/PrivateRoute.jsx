// components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute