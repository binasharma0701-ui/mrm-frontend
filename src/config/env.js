export const envConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3001/api',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  appName: import.meta.env.VITE_APP_NAME || 'MRM Idols',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  imageCdnUrl: import.meta.env.VITE_IMAGE_CDN_URL || '',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
}
