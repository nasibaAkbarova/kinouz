import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import GenreFilter from '../../components/GenreFilter';
import MovieCard from '../../components/MovieCard';
import { getTrendingMovies, getMoviesByGenre, searchMovies, type MovieWithTrailer } from '../../services/api';

const Movies = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [movies, setMovies] = useState<MovieWithTrailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreId = params.get('genre');
    const search = params.get('search');
    
    if (genreId) {
      setSelectedGenreId(Number(genreId));
      setSearchQuery(null);
    } else if (search) {
      setSearchQuery(search);
      setSelectedGenreId(null);
    } else {
      setSelectedGenreId(null);
      setSearchQuery(null);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery);
        } else if (selectedGenreId) {
          data = await getMoviesByGenre(selectedGenreId);
        } else {
          data = await getTrendingMovies();
        }
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenreId, searchQuery]);

  if (loading && movies.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-3xl font-bold">{t('nav.movies')}</h1>
        <SearchBar />
      </div>

      <div className="mb-8">
        <GenreFilter 
          selectedGenreId={selectedGenreId} 
          onGenreSelect={setSelectedGenreId} 
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              image={movie.poster_path} 
              trailerUrl={movie.trailer_url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          Ushbu janrda kinolar topilmadi.
        </div>
      )}
    </div>
  );
};

export default Movies;