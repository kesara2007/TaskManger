import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-navy-800 text-beige-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-yellow-300">
          Task Manager
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-yellow-300 transition">
              Dashboard
            </Link>
            <Link to="/tasks" className="hover:text-yellow-300 transition">
              Tasks
            </Link>
            <Link to="/categories" className="hover:text-yellow-300 transition">
              Categories
            </Link>
            <Link to="/profile" className="hover:text-yellow-300 transition">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-yellow-500 hover:bg-yellow-600 text-navy-900 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-300 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar