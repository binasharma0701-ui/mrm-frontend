import { authAPI, userAPI } from '../api/index'

const AuthService = {
  async login(email, password) {
    try {
      const response = await authAPI.login({ email, password })
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Login failed'
    }
  },

  async register(userData) {
    try {
      const response = await authAPI.register(userData)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed'
    }
  },

  async logout() {
    try {
      await authAPI.logout()
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  async getCurrentUser() {
    try {
      const response = await authAPI.getCurrentUser()
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch user'
    }
  },

  async updateProfile(data) {
    try {
      const response = await userAPI.updateProfile(data)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile'
    }
  },

  isLoggedIn() {
    return !!localStorage.getItem('authToken')
  },

  getToken() {
    return localStorage.getItem('authToken')
  },
}

export default AuthService
