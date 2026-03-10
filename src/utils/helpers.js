export const formatPrice = (price, currency = 'INR') => {
  if (!price) return '₹0'
  return `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return 0
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100
  return Math.round(discount)
}

export const generateSlug = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const capitalizeFirst = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

export const formattedDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
