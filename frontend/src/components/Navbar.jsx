import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">JerseyHub</Link>
      <div className="nav-links">
        <Link to="/" className="nav-item">
          <Home size={20} /> Home
        </Link>
        <Link to="/cart" className="nav-item">
          <ShoppingCart size={20} />
          Cart
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
