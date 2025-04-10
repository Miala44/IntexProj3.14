import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviePage';
import DetailPage from './pages/DetailPage';
import PrivacyPage from './pages/PrivacyPage';
import LandingPage from './pages/LandingPage';
import RecommendationsPage from './pages/RecommendationsPage';
import IntroPage from './pages/IntroPage';
import AdminPage from './pages/AdminPage';
import 'react-multi-carousel/lib/styles.css';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
// Moved the logic here so it's within <Router> context
function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ['/', '/login', '/register', '/logout'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        <Route path="/moviepage" element={<IntroPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/movie" element={<MoviesPage />} />
        <Route path="/detailPage/:id" element={<DetailPage />} />
        <Route path="/privacyPage" element={<PrivacyPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/adminmovies" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
export default App;
