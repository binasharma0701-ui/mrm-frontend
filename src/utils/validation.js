export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/
  return re.test(String(phone))
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
}

export const validatePincode = (pincode) => {
  const re = /^[0-9]{6}$/
  return re.test(String(pincode))
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

export const validateForm = (formData, requiredFields) => {
  const errors = {}
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field} is required`
    }
  })
  return errors
}
