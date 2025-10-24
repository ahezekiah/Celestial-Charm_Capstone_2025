import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'; 
import { Analytics } from '@vercel/analytics/react';
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
import Quiz from './pages/Dashboard/Quiz/Quiz';
import Results from './pages/Dashboard/Quiz/Results/Results';
import Wishlist from './pages/Dashboard/Wishlist/Wishlist';
import Books from './pages/Dashboard/Personalization/Books/Books';
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
import Knowledge from './pages/Dashboard/Quiz/Knowledge/Knowledge';
import Personality from './pages/Dashboard/Quiz/Personality/Personality';
import GemShop from './pages/Dashboard/Shop/GemShop/GemShop';
import Inventory from './pages/Dashboard/Inventory/Inventory';
import Music from './pages/Dashboard/Personalization/Music/Music';
import Blog from './pages/Dashboard/Personalization/Blog/Blog';
import { SpeedInsights } from "@vercel/speed-insights/next"


function App() {
  
  return (
    <>
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
          <Route path="/gem-shop" element={<ProtectedRoute><GemShop /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/music" element={<ProtectedRoute><Music /></ProtectedRoute>} />
          <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Web Analytics */}
        <Analytics />
        {/* Speed Insights */}
        <SpeedInsights />
    </>
        
        
  );
}

export default App;
