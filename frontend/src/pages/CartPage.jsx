import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

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
                <div key={item._id || item.name} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <p className="product-team">{item.team}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                  <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeFromCart(item._id || item.name)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
              <button className="btn-checkout">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
