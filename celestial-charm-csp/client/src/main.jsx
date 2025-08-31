import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
// import { UserProvider } from './context/UserContext.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserAnswersProvider } from './context/UserAnswersContext.jsx';
import { CartWishlistProvider } from './context/CartWishlistContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
        {/* <UserProvider> */}
          <UserAnswersProvider>
            <CartWishlistProvider>
                <App />
            </CartWishlistProvider>
          </UserAnswersProvider>
        {/* </UserProvider> */}
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
