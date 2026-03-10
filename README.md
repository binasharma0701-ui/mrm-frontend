# MRM Idols - E-commerce Frontend

A production-ready, fully responsive e-commerce frontend for MRM Handicrafted Idols built with React and Vite.

## 🎯 Features

- **Fully Responsive Design** - Mobile-first, optimized for all devices
- **Modern UI/UX** - Beautiful and intuitive user interface
- **Component Architecture** - Reusable and maintainable components
- **State Management** - Context API for global state
- **API Integration** - Ready-to-use service layer with Axios
- **Authentication** - Login/Register functionality
- **Shopping Cart** - Add to cart, wishlist features
- **SEO Optimized** - Meta tags and structured data
- **Performance** - Code splitting and lazy loading
- **Dark Mode Support** - Theme switching capability

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Ultra-fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with CSS variables
- **Zustand** - State management (optional)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd mrm-idols-frontend
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=MRM Idols
VITE_IMAGE_CDN_URL=https://cdn.example.com/
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── app/                 # Core app config
│   ├── App.jsx
│   ├── routes.jsx
│   ├── layout.jsx
│   ├── providers.jsx
│   ├── config.js
│   └── store.js
├── components/          # Reusable components
│   ├── layout/         # Navbar, Footer, etc.
│   ├── home/           # Home specific
│   ├── collection/     # Collection components
│   ├── product/        # Product components
│   └── ui/             # Generic UI components
├── pages/              # Page components
├── context/            # Global contexts
├── hooks/              # Custom hooks
├── services/           # Business logic
├── api/                # API calls
├── utils/              # Helper functions
├── styles/             # Global styles
├── config/             # Configuration
├── data/               # Mock data
└── main.jsx
```

## 🎨 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 📝 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🔌 API Endpoints

The frontend connects to these main endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /collections` - Get all collections
- `POST /cart/add` - Add item to cart
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

See `src/api/endpoints.js` for complete endpoint list.

## 🎯 Key Components

### Layout Components
- **Navbar** - Navigation with search and account
- **Footer** - Footer with links and info
- **MobileMenu** - Mobile navigation drawer

### Home Components
- **Hero** - Hero banner with CTA
- **CategorySection** - Browse by category
- **FeaturedSection** - Featured products

### Context Providers
- **CartContext** - Shopping cart state
- **AuthContext** - Authentication state
- **WishlistContext** - Wishlist state
- **ThemeContext** - Theme (light/dark) state

### Custom Hooks
- `useCart()` - Access cart state
- `useAuth()` - Access auth state
- `useWishlist()` - Access wishlist state
- `useFetch()` - Data fetching
- `useDebounce()` - Debounce values
- `useLocalStorage()` - Local storage access

## 🔐 Authentication

### Login
```javascript
import { useAuth } from '@hooks/useAuth'

function LoginComponent() {
  const { login } = useAuth()
  
  const handleLogin = async (email, password) => {
    await login(email, password)
  }
}
```

### Protected Routes
Protected pages require login. User will be redirected to login page if not authenticated.

## 🛒 Shopping Cart

```javascript
import { useCart } from '@hooks/useCart'

function CartComponent() {
  const { cart, addToCart, removeFromCart } = useCart()
}
```

## 🎨 Styling

- CSS variables for theming in `src/styles/variables.css`
- Responsive utilities in `src/styles/responsive.css`
- Animations in `src/styles/animations.css`
- Global styles in `src/styles/global.css`

### Using CSS Variables
```css
color: var(--color-primary);
font-size: var(--fs-lg);
padding: var(--spacing-md);
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test src/components/Button.test.jsx

# Run with coverage
npm run test:coverage
```

## 📱 Mobile Optimization

- Touch-friendly UI elements
- Optimized images for mobile
- Fast loading times
- Mobile menu with navigation
- Responsive grid layouts

## ⚡ Performance

- Code splitting by routes
- Image lazy loading
- Minified production builds
- CSS optimization
- Tree shaking

## 🐛 Debugging

Enable debug mode in `.env`:
```env
VITE_DEBUG=true
```

Check browser console for development messages and network requests.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop `dist` folder to Netlify Dashboard
```

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Team

**MRM Handicrafts**
- Website: [mrmidols.com](https://mrmidols.com)
- Email: info@mrmidols.com

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from system emojis
- Typography inspired by serif and sans-serif combinations

## 📞 Support

For support, email support@mrmidols.com or create an issue in the repository.

---

**Made with ❤️ by MRM Handicrafts**
