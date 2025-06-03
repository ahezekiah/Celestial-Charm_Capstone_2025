import './App.css';
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
import { UserAnswersProvider } from './context/UserAnswersContext';
import ProtectedRoute from './utils/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

function App() {
  
  return (
    <UserAnswersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/kpop" element={<Kpop />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/kpop2" element={<ProtectedRoute><Kpop2 /></ProtectedRoute>} />
          <Route path="/anime2" element={<ProtectedRoute><Anime2 /></ProtectedRoute>} />

          {/* 💡 PERSONALIZATION FLOW */}
          <Route path="/personalization" element={<ProtectedRoute><Personalization /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </UserAnswersProvider>
    
  );
}

export default App;
