// src/pages/FavoritesPage.jsx
import RecipeGridMakanan from '../components/makanan/RecipeGrid';
import RecipeGridMinuman from '../components/minuman/RecipeGrid';

export default function FavoritesPage({ favorites, toggleFavorite }) {
  // Pisahkan favorit berdasarkan jenisnya
  const favoriteMakanan = favorites.filter(recipe => 
    recipe.ingredients.some(ing => ing.toLowerCase().includes('nasi') || ing.toLowerCase().includes('daging') || ing.toLowerCase().includes('ayam'))
  );
  const favoriteMinuman = favorites.filter(recipe => !favoriteMakanan.includes(recipe));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-8">
          Resep Favorit Anda
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">Anda belum memiliki resep favorit.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {favoriteMakanan.length > 0 && (
              <RecipeGridMakanan 
                recipes={favoriteMakanan} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            )}
            {favoriteMinuman.length > 0 && (
              <RecipeGridMinuman 
                recipes={favoriteMinuman} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}