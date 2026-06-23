import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Clock, Eye, X, Search, CheckCircle2 } from 'lucide-react';

const isComingSoon = (url) => url && (url.includes('placehold.co') || url.includes('wikimedia.org'));

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize);
    setToastMessage(`Added ${selectedProduct.name} to cart!`);
    setSelectedProduct(null);
    setSelectedSize(null);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredProducts = products.filter(product => 
    product.team.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${apiUrl}/api/products`);
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
        <div className="hero-cover">
          <img src="/jerseys/cover photo.jpg" alt="JerseyHub Cover" className="hero-cover-img" />
          <div className="hero-content">
            <h1 className="hero-title">Elevate Your Game</h1>
            <p className="hero-subtitle">Premium jerseys for the true fans. Wear your passion.</p>
          </div>
        </div>
      </section>

      <div className="controls-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search teams or jerseys..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results">No jerseys found matching your search.</div>
        ) : (
          filteredProducts.map((product) => {
            const comingSoon = isComingSoon(product.imageUrl);
          return (
            <div key={product._id || product.name} className={`product-card ${comingSoon ? 'coming-soon-card' : ''}`}>
              <div className="product-img-wrapper" onClick={() => !comingSoon && setSelectedProduct(product)} style={{ cursor: comingSoon ? 'default' : 'pointer' }}>
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
                {product.offer && (
                  <div className="product-offer">{product.offer}</div>
                )}
                <div className="product-price">${product.price.toFixed(2)}</div>
                {comingSoon ? (
                  <button className="btn-add btn-coming-soon" disabled>
                    Coming Soon
                  </button>
                ) : (
                  <div className="card-actions">
                    <button 
                      className="btn-add flex-1" 
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedSize(null);
                      }}
                    >
                      Select Size
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={24} />
            </button>
            <div className="modal-body">
              <div className="modal-img-container">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="modal-img" />
              </div>
              <div className="modal-details">
                <span className="modal-team">{selectedProduct.team}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                {selectedProduct.offer && (
                  <div className="product-offer modal-offer">{selectedProduct.offer}</div>
                )}
                <div className="modal-price">${selectedProduct.price.toFixed(2)}</div>
                <p className="modal-desc">{selectedProduct.description}</p>
                
                <div className="modal-sizes">
                  <h4>Select Size</h4>
                  <div className="size-options">
                    {selectedProduct.sizes.map(size => (
                      <span 
                        key={size} 
                        className={`size-badge ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-stock">
                  <span className={`stock-status ${selectedProduct.stockCount > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {selectedProduct.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <button 
                  className={`btn-add modal-btn ${!selectedSize ? 'disabled' : ''}`} 
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                >
                  {!selectedSize ? 'Please Select a Size' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={24} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default HomePage;
