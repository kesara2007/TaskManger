// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute.jsx'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-beige-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App