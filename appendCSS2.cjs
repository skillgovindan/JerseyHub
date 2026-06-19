const fs = require('fs');
const cssPath = './frontend/src/index.css';

const newCSS = `
/* ---------------------------------
   Search & Controls
--------------------------------- */
.controls-section {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--surface-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
}

.search-icon {
  color: var(--text-secondary);
  margin-right: 1rem;
}

.search-bar input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1.1rem;
  width: 100%;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-secondary);
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

/* ---------------------------------
   Toast Notifications
--------------------------------- */
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--surface-color);
  border-left: 4px solid #10b981;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .toast-notification {
    bottom: 20px;
    right: 20px;
    left: 20px;
    justify-content: center;
  }
}
`;

fs.appendFileSync(cssPath, '\n' + newCSS);
console.log('Appended search & toast CSS');
