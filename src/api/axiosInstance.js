import axios from 'axios'
import { config } from '../app/config'

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: parseInt(config.API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
