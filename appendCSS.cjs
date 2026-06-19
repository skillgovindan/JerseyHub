const fs = require('fs');
const cssPath = './frontend/src/index.css';

const newCSS = `
/* ---------------------------------
   Payment Modal
--------------------------------- */
.payment-overlay {
  z-index: 200;
}

.payment-modal {
  background: var(--surface-color);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.3s ease;
}

.payment-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.payment-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.payment-subtitle strong {
  color: var(--accent-color);
  font-size: 1.3rem;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method-card:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.payment-status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  text-align: center;
}

.payment-status-container h3 {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.5rem;
}

.payment-status-container p {
  color: var(--text-secondary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-icon {
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

/* Mobile Responsiveness for Payment Modal */
@media (max-width: 480px) {
  .payment-modal {
    padding: 1.5rem;
  }
  .payment-method-card {
    padding: 1rem;
    font-size: 1.1rem;
  }
}
`;

fs.appendFileSync(cssPath, '\n' + newCSS);
console.log('Appended payment CSS');
