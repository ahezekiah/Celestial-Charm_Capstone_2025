import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'; 

import Home from './pages/Home/Home';
import Store from './pages/Home/Store/Store';
import Kpop from './pages/Home/Kpop/Kpop';
import Anime from './pages/Home/Anime/Anime';
import NotFound from './pages/NotFound/NotFound';
import Reviews from './pages/Home/Reviews/Reviews';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Shop from './pages/Dashboard/Shop/Shop';
import Anime2 from './pages/Dashboard/Anime/Anime2';
import Kpop2 from './pages/Dashboard/Kpop/Kpop2';
import Personalization from './pages/Dashboard/Personalization/Personalization';
import Quiz from './pages/Dashboard/Personalization/Quiz/Quiz';
import Results from './pages/Dashboard/Personalization/Results/Results';
import Wishlist from './pages/Dashboard/Personalization/Wishlist/Wishlist';
import Books from './pages/Dashboard/Books/Books';
import Fantasy from './pages/Dashboard/Books/Fantasy/Fantasy';
import Romance from './pages/Dashboard/Books/Romance/Romance';
import Mystery from './pages/Dashboard/Books/Mystery/Mystery';
import Account from './pages/Dashboard/Account/Account';
import Cart from './pages/Dashboard/Cart/Cart';
import Fashion from './pages/Dashboard/Shop/Fashion/Fashion';
import Fragrances from './pages/Dashboard/Shop/Fragrances/Fragrances';
import Jewelry from './pages/Dashboard/Shop/Jewelry/Jewelry';
import Policies from './pages/Policies/Policies';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/Policies/TermsOfServices/TermsOfServies';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ForgotUsername from './pages/Forgot/ForgotUsername';
import ForgotPassword from './pages/Forgot/ForgotPassword';
import Knowledge from './pages/Dashboard/Personalization/Quiz/Knowledge/Knowledge';
import Personality from './pages/Dashboard/Personalization/Quiz/Personality/Personality';

function App() {
  
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/kpop" element={<Kpop />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Public Routes */}
          <Route path="/policies" element={<Policies />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Protected Routes */}
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/fashion" element={<ProtectedRoute><Fashion /></ProtectedRoute>} />
          <Route path="/fragrances" element={<ProtectedRoute><Fragrances /></ProtectedRoute>} />
          <Route path="/jewelry" element={<ProtectedRoute><Jewelry /></ProtectedRoute>} />
          <Route path="/fantasy" element={<ProtectedRoute><Fantasy /></ProtectedRoute>} />
          <Route path="/romance" element={<ProtectedRoute><Romance /></ProtectedRoute>} />
          <Route path="/mystery" element={<ProtectedRoute><Mystery /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/kpop2" element={<ProtectedRoute><Kpop2 /></ProtectedRoute>} />
          <Route path="/anime2" element={<ProtectedRoute><Anime2 /></ProtectedRoute>} />
          <Route path="/personalization" element={<ProtectedRoute><Personalization /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/knowledge" element={<ProtectedRoute><Knowledge /></ProtectedRoute>} />
          <Route path="/personality" element={<ProtectedRoute><Personality /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
}

export default App;
