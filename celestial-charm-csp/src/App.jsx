import './App.css';
import Home from './components/Home/Home'; 
import Store from './components/Store/Store';
import Kpop from './components/Kpop/Kpop';
import Anime from './components/Anime/Anime';
import NotFound from './components/NotFound/NotFound';
import Reviews from './components/Reviews/Reviews';
// import Main from './components/MainPage/Main';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/store' element={<Store />} />
      <Route path='/kpop' element={<Kpop />} />
      <Route path='/anime' element={<Anime />} />
      <Route path='/reviews' element={<Reviews />} />
      {/* <Route path='/main' element={<Main />} /> */}
      {/* <Route path='/reviews/:id' element={<Reviews />} /> */}
      {/* <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} /> */}
      {/* You can add more <Route> for other pages later */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
