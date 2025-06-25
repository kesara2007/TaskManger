import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const res = await api.get('/category/cp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(res.data.categories)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories')
    } finally {
      setIsLoading(false)
    }
  }

  const createCategory = async (name) => {
    try {
      const res = await api.post('/category/cp', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories([res.data.category, ...categories])
      return { success: true, category: res.data.category }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create category' }
    }
  }

  const updateCategory = async (id, name) => {
    try {
      const res = await api.put(`/category/${id}/cp`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(categories.map(cat => cat._id === id ? res.data.category : cat))
      return { success: true, category: res.data.category }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update category' }
    }
  }

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}/cp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(categories.filter(cat => cat._id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete category' }
    }
  }

  useEffect(() => {
    if (token) {
      fetchCategories()
    }
  }, [token])

  return { categories, isLoading, error, createCategory, updateCategory, deleteCategory, fetchCategories }
}