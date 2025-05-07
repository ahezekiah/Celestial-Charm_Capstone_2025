import './App.css';
import Home from './client/pages/Home/Home';
import Store from './client/pages/Store/Store';
import Kpop from './client/pages/Kpop/Kpop';
import Anime from './client/pages/Anime/Anime';
import NotFound from './client/pages/NotFound/NotFound';
import Reviews from './client/pages/Reviews/Reviews';
import Register from './client/pages/Register/Register';
import Login from './client/pages/Login/Login';
import Dashboard from './client/pages/Dashboard/Dashboard';
import ProctectedRoute from './utils/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'; 
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);


  return (
    <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/kpop' element={<Kpop />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<ProctectedRoute><Dashboard /></ProctectedRoute>} />
          {/* <Route path='/reviews/:id' element={<Reviews />} /> */}
          {/* You can add more <Route> for other pages later */}
          <Route path='*' element={<NotFound />} />
      </Routes>
    
  );
}

export default App;
