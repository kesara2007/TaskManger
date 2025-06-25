import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUser(res.data.user)
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [token])
  
  // Add token validation check
useEffect(() => {
  const checkTokenExpiration = () => {
    const tokenExpires = localStorage.getItem('token_expires')
    if (tokenExpires && Date.now() > parseInt(tokenExpires)) {
      logout()
    }
  }

  checkTokenExpiration()
  const interval = setInterval(checkTokenExpiration, 60000) // Check every minute
  return () => clearInterval(interval)
}, [])

  const login = async (email, password) => {
    try {
      const res = await api.post('/user/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('token_expires',Date.now() +7 * 24 * 60 * 60 * 1000)
      setToken(res.data.token)
      setUser(res.data.user)
      navigate('/')
    } catch (error) {
      throw error.response?.data?.message || 'Login failed'
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/user/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      setUser(res.data.user)
      navigate('/')
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed'
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)