import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute