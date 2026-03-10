// Use environment variable in production, but dynamically detect local IP in dev
const getNetworkBaseUrl = () => {
  if (import.meta.env.PROD && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Fallback to the current window's hostname on port 3001 if local network
  return `http://${window.location.hostname}:3001/api`;
}

export const config = {
  API_BASE_URL: getNetworkBaseUrl(),
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  IMAGE_CDN_URL: import.meta.env.VITE_IMAGE_CDN_URL,
  ENABLE_CHAT: import.meta.env.VITE_ENABLE_CHAT === 'true',
  ENABLE_WISHLIST: import.meta.env.VITE_ENABLE_WISHLIST === 'true',
};

export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return '';

  // Normalize windows backslashes to forward slashes
  const normalizedPath = path.replace(/\\/g, '/');

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  // If the path is a local static frontend asset, return it as-is
  if (normalizedPath.startsWith('/images/')) {
    return normalizedPath;
  }
  if (normalizedPath.startsWith('images/')) {
    return `/${normalizedPath}`;
  }

  // Remove leading slash if present
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.substring(1) : normalizedPath;

  // Use dynamic image host identical to API
  const baseUrl = config.IMAGE_CDN_URL || `http://${window.location.hostname}:3001`;

  // Ensure the base URL doesn't end with a slash, then append the path
  return `${baseUrl.replace(/\/$/, '')}/${cleanPath}`;
};
