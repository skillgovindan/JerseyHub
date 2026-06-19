import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Clock } from 'lucide-react';

const isComingSoon = (url) => url && url.includes('placehold.co');

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="main-content">
      <section className="hero-section">
        <h1 className="hero-title">Elevate Your Game</h1>
        <p className="hero-subtitle">Premium jerseys for the true fans. Wear your passion.</p>
      </section>

      <div className="products-grid">
        {products.map((product) => {
          const comingSoon = isComingSoon(product.imageUrl);
          return (
            <div key={product._id || product.name} className={`product-card ${comingSoon ? 'coming-soon-card' : ''}`}>
              <div className="product-img-wrapper">
                {comingSoon && (
                  <div className="coming-soon-overlay">
                    <Clock size={32} />
                    <span>Coming Soon</span>
                  </div>
                )}
                <img src={product.imageUrl} alt={product.name} className={`product-img ${comingSoon ? 'coming-soon-img' : ''}`} />
              </div>
              <div className="product-info">
                <span className="product-team">{product.team}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">${product.price.toFixed(2)}</div>
                {comingSoon ? (
                  <button className="btn-add btn-coming-soon" disabled>
                    Coming Soon
                  </button>
                ) : (
                  <button 
                    className="btn-add" 
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
