import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviePage';
import DetailPage from './pages/DetailPage';
import IntroPage from './pages/IntroPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/intro" element={<IntroPage />} />
            <Route path="/movie" element={<MoviesPage />} />
            <Route path="/detailPage/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
