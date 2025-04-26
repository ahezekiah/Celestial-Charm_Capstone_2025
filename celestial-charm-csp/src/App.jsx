import './App.css';
import Home from './components/Home/Home'; 
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* You can add more <Route> for other pages later */}
    </Routes>
  );
}

export default App;
