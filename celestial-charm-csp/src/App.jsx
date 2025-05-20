import './App.css';
import Home from './client/pages/Home/Home';
import Store from './client/pages/Home/Store/Store';
import Kpop from './client/pages/Home/Kpop/Kpop';
import Anime from './client/pages/Home/Anime/Anime';
import NotFound from './client/pages/NotFound/NotFound';
import Reviews from './client/pages/Home/Reviews/Reviews';
import Register from './client/pages/Register/Register';
import Login from './client/pages/Login/Login';
import Dashboard from './client/pages/Dashboard/Dashboard';
import Shop from './client/pages/Dashboard/Shop/Shop';
import Anime2 from './client/pages/Dashboard/Anime/Anime2';
import Kpop2 from './client/pages/Dashboard/Kpop/Kpop2';
import ProctectedRoute from './utils/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  
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
          <Route path='/shop' element={<ProctectedRoute><Shop /></ProctectedRoute>} />
          <Route path='/kpop2' element={<ProctectedRoute><Kpop2 /></ProctectedRoute>} />
          <Route path='/anime2' element={<ProctectedRoute><Anime2 /></ProctectedRoute>} />
          {/* <Route path='/reviews/:id' element={<Reviews />} /> */}
          {/* You can add more <Route> for other pages later */}
          <Route path='*' element={<NotFound />} />
      </Routes>
    
  );
}

export default App;
