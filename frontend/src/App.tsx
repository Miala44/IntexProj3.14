import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviePage';
import DetailPage from './pages/DetailPage';
import PrivacyPage from './pages/PrivacyPage';
import LandingPage from './pages/LandingPage';
import RecommendationsPage from './pages/RecommendationsPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movie" element={<MoviesPage />} />
            <Route path="/detailPage/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacyPage" element={<PrivacyPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
