import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../app/config';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "🙏 *Hari Om! I want to place an order from MRM Idols.*\n\n*My Cart Details:*\n";

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}*\n`;
      message += `   • Category: ${item.collection || item.category || 'N/A'}\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      if (item.sku) message += `   • SKU: ${item.sku}\n`;
    });

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    message += `\n*Total Items:* ${totalItems}\n`;
    message += `\n*Please let me know the total price including shipping and how to proceed with the payment.*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916367929608?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="cart-page container mx-auto px-4 py-12 min-h-[60vh]">
      <h1 className="text-4xl font-serif text-center mb-8 text-[#1d0000]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
          <Link to="/collections" className="btn btn-primary inline-block">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="cart-container max-w-4xl mx-auto">
          <div className="cart-items bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            {cartItems.map(item => (
              <div key={item._id || item.id} className="cart-item border-b border-gray-100 last:border-0 py-4 flex flex-col sm:flex-row items-center gap-6">
                <div className="cart-item-image w-24 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="cart-item-details flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.collection || item.category}</p>
                </div>
                <div className="cart-item-actions flex items-center gap-4">
                  <div className="quantity-control flex items-center border border-gray-200 rounded-full bg-gray-50">
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l-full transition-colors"
                      onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                    >-</button>
                    <span className="px-2 w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r-full transition-colors"
                      onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button
                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                    onClick={() => removeFromCart(item._id || item.id)}
                    title="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              Total Items: <span className="font-semibold text-black">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn btn-secondary"
              style={{ padding: '12px 30px', fontSize: '1.05rem', minWidth: '250px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>Checkout via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
