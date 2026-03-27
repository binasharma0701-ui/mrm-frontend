// Use environment variable in production, but dynamically detect local IP in dev
const getNetworkBaseUrl = () => {
  // 1. Check process.env/import.meta.env
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // 2. If it's a real full URL, use it
  if (envUrl && envUrl.startsWith('http')) {
    return envUrl;
  }

  // 3. Failsafe for Vercel
  if (window.location.hostname.includes('vercel.app')) {
    console.log('Vercel detected, using Render fallback: https://mrm-backend-ozmj.onrender.com/api');
    return 'https://mrm-backend-ozmj.onrender.com/api';
  }

  // 4. Local dev fallback
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

// Inject Cloudinary auto-optimization (format, quality, width) into a Cloudinary URL
const applyCloudinaryOptimizations = (url, width = 600) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  // Insert transformation after /upload/
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
};

export const getImageUrl = (path, width = 600) => {
  if (!path || typeof path !== 'string') return '/images/placeholder.png'; // Use a real placeholder

  // Normalize windows backslashes to forward slashes
  const normalizedPath = path.replace(/\\/g, '/');

  // 1. If it's already a full URL (Cloudinary), use it immediately
  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return applyCloudinaryOptimizations(normalizedPath, width);
  }

  // 2. If it's a local static frontend asset, return it
  if (normalizedPath.startsWith('/images/') || normalizedPath.startsWith('images/')) {
    return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  }

  // 3. INTERNAL CHECK: If we are in production (Vercel) but the path is local (uploads/...)
  // This means the image was not uploaded to Cloudinary and will be BROKEN.
  const isLocalPath = normalizedPath.includes('uploads/');
  const isProduction = window.location.hostname.includes('vercel.app') || 
                       window.location.hostname.includes('onrender.com');

  if (isProduction && isLocalPath) {
    console.warn(`🕒 LEGACY IMAGE DETECTED: "${normalizedPath}" is a local file. ` + 
                 `On Render/Vercel, local files are NOT permanent. Please re-upload this item in the CRM.`);
    // Fallback to a placeholder so the UI doesn't look broken
    return 'https://placehold.co/600x400/f3f4f6/d4a574?text=Please+Re-upload+Image';
  }

  // 4. Handle relative paths (e.g. "uploads/image.jpg")
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.substring(1) : normalizedPath;

  let baseUrl = config.IMAGE_CDN_URL;
  if (!baseUrl) {
    baseUrl = config.API_BASE_URL.replace(/\/api\/?$/, '');
  }

  const finalUrl = `${baseUrl.replace(/\/$/, '')}/${cleanPath}`;
  return applyCloudinaryOptimizations(finalUrl, width);
};
