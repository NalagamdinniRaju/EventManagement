import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import App from './App'; // or './LoginRegister' if your main component is named differently

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App /> {/* or <LoginRegister /> if your main component is named differently */}
  </React.StrictMode>
);
