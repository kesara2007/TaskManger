import { useState } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token, user } = useAuth()

  const updateProfile = async (name, email) => {
    setIsLoading(true)
    try {
      const res = await api.put('/user/update', { name, email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
      return { success: true, user: res.data.user }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
      return { success: false, message: err.response?.data?.message || 'Failed to update profile' }
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (currentPassword, newPassword) => {
    setIsLoading(true)
    try {
      await api.put('/user/password', { currentPassword, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password')
      return { success: false, message: err.response?.data?.message || 'Failed to update password' }
    } finally {
      setIsLoading(false)
    }
  }

  return { user, isLoading, error, updateProfile, updatePassword }
}