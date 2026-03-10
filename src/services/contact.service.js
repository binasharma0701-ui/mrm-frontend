import { contactAPI } from '../api/index'

const ContactService = {
  async sendMessage(data) {
    try {
      const response = await contactAPI.send(data)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send message'
    }
  },
}

export default ContactService
