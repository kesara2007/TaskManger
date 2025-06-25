import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      await login(email, password)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-navy-800 mb-6">Login</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-beige-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-beige-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-beige-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-beige-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-navy-900 font-bold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-beige-700">
          Don't have an account?{' '}
          <a href="/register" className="text-yellow-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm