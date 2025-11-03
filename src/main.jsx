// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'; // Tambahkan useEffect
import { createRoot } from 'react-dom/client';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage'; // <- TAMBAHKAN: Halaman baru untuk favorit
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css';
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  // --- TAMBAHKAN STATE FAVORITES ---
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // --- TAMBAHKAN EFEK UNTUK MENYIMPAN KE LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // --- TAMBAHKAN FUNGSI UNTUK TOGGLE FAVORIT ---
  const toggleFavorite = (recipe) => {
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };
  // ---------------------------------------------

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    // --- Kirim props favorites dan toggleFavorite ke halaman yang relevan ---
    switch (currentPage) {
      case 'home':
        return <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'makanan':
        return <MakananPage favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'minuman':
        return <MinumanPage favorites={favorites} toggleFavorite={toggleFavorite} />;
      // --- TAMBAHKAN CASE UNTUK HALAMAN FAVORIT ---
      case 'favorit':
        return <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);