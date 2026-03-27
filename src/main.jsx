import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/global.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
