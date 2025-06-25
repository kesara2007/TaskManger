import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const res = await api.get('/tasks/gp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(res.data.tasks)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      const res = await api.post('/tasks/gp', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks([res.data.task, ...tasks])
      return { success: true, task: res.data.task }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create task' }
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}/gp`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(tasks.map(task => task._id === id ? res.data.task : task))
      return { success: true, task: res.data.task }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update task' }
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}/gp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(tasks.filter(task => task._id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete task' }
    }
  }

  useEffect(() => {
    if (token) {
      fetchTasks()
    }
  }, [token])

  return { tasks, isLoading, error, createTask, updateTask, deleteTask, fetchTasks }
}