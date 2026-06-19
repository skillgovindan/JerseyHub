import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2, X, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

  const processPayment = (method) => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      clearCart();
    }, 2000);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="main-content">
      <div className="cart-container">
        <h1 className="cart-header">Your Cart</h1>
        
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item._id}-${item.selectedSize}`} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <p className="product-team">{item.team}</p>
                    <p className="cart-item-size">Size: {item.selectedSize}</p>
                    <div className="qty-controls">
                      <button 
                        className="btn-qty" 
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button 
                        className="btn-qty" 
                        onClick={() => updateQuantity(item._id, item.selectedSize, item.qty + 1)}
                        disabled={item.qty >= item.stockCount}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeFromCart(item._id, item.selectedSize)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
              <button className="btn-checkout" onClick={() => { setShowModal(true); setPaymentStatus('idle'); }}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="modal-overlay payment-overlay">
          <div className="payment-modal">
            {paymentStatus !== 'processing' && (
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            )}
            
            {paymentStatus === 'idle' && (
              <>
                <h2 className="payment-title">Complete Payment</h2>
                <p className="payment-subtitle">Total Amount: <strong>${cartTotal.toFixed(2)}</strong></p>
                
                <div className="payment-options">
                  <button className="payment-method-card" onClick={() => processPayment('Credit Card')}>
                    <CreditCard size={28} />
                    <span>Credit Card</span>
                  </button>
                  <button className="payment-method-card" onClick={() => processPayment('PayPal')}>
                    <Smartphone size={28} />
                    <span>PayPal</span>
                  </button>
                  <button className="payment-method-card" onClick={() => processPayment('Apple Pay')}>
                    <Smartphone size={28} />
                    <span>Apple Pay</span>
                  </button>
                </div>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="payment-status-container">
                <div className="spinner"></div>
                <h3>Processing Payment...</h3>
                <p>Please do not close this window.</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="payment-status-container success-container">
                <CheckCircle size={64} color="#10b981" className="success-icon" />
                <h3>Payment Successful!</h3>
                <p>Thank you for your order.</p>
                <button className="btn-add" style={{ marginTop: '1.5rem' }} onClick={() => setShowModal(false)}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
