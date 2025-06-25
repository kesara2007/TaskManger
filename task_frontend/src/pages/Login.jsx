import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}

export default Login