import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import MovieCard from '../../app/components/MovieCard';

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen pb-20">
      <h1 className="text-3xl font-bold mb-8">{t('nav.favorites')}</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {favorites.map((movie) => (
            <MovieCard 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              image={movie.image} 
              trailerUrl={movie.trailerUrl}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
          <p className="text-xl">Sizda hali sevimlilar yo'q.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;