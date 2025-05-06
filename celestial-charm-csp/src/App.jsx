import './App.css';
import Home from './client/components/Home/Home'; 
import Store from './client/components/Store/Store';
import Kpop from './client/components/Kpop/Kpop';
import Anime from './client/components/Anime/Anime';
import NotFound from './client/components/NotFound/NotFound';
import Reviews from './client/components/Reviews/Reviews';
import Register from './client/components/Register/Register';
import Login from './client/components/Login/Login';
import Dashboard from './client/components/Dashboard/Dashboard';
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
      {/* <Route path='/reviews/:id' element={<Reviews />} /> */}
      {/* You can add more <Route> for other pages later */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
