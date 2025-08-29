import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserAnswersProvider } from './context/UserAnswersContext';
import { CartWishlistProvider } from './context/CartWishlistContext';
import { AuthProvider } from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
          <UserAnswersProvider>
            <CartWishlistProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </CartWishlistProvider>
          </UserAnswersProvider>
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
