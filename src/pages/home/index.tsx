import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { getTrendingMovies, getAnimations, getDoramas, getMoviesByGenre, type MovieWithTrailer } from '../../services/api';
import Accordion from '../../components/Accordion';
import { FaInfo, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

const MovieRow = ({ title, data }: { title: string; data: MovieWithTrailer[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const SCROLL_AMOUNT = 900;

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <section className="relative group/row">
      <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
        {title}
        <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore All ›
        </span>
      </h2>

      <div className="relative">
        {/* Chap tugma */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(to right, #141414, transparent)' }}
        >
          <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition border border-white/10">
            <FaChevronLeft size={14} />
          </div>
        </button>

        {/* Filmlar */}
        <div
          ref={containerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-[calc(33.333%-8px)] sm:w-[calc(25%-9px)] md:w-[calc(16.666%-10px)]"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.poster_path}
                trailerUrl={movie.trailer_url}
              />
            </div>
          ))}
        </div>

        {/* O'ng tugma */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(to left, #141414, transparent)' }}
        >
          <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition border border-white/10">
            <FaChevronRight size={14} />
          </div>
        </button>
      </div>
    </section>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieWithTrailer[]>([]);
  const [animations, setAnimations] = useState<MovieWithTrailer[]>([]);
  const [doramas, setDoramas] = useState<MovieWithTrailer[]>([]);
  const [actionMovies, setActionMovies] = useState<MovieWithTrailer[]>([]);
  const [adventureMovies, setAdventureMovies] = useState<MovieWithTrailer[]>([]);
  const [comedyMovies, setComedyMovies] = useState<MovieWithTrailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, animationsData, doramasData, actionData, adventureData, comedyData] =
          await Promise.all([
            getTrendingMovies(),
            getAnimations(),
            getDoramas(),
            getMoviesByGenre(28),
            getMoviesByGenre(12),
            getMoviesByGenre(35),
          ]);
        setMovies(moviesData);
        setAnimations(animationsData);
        setDoramas(doramasData);
        setActionMovies(actionData);
        setAdventureMovies(adventureData);
        setComedyMovies(comedyData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#141414]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const heroMovie = movies[0];

  return (
    <div className="relative min-h-screen bg-[#141414]">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full">
        <div className="absolute inset-0">
          <img
            src={
              heroMovie?.backdrop_path ||
              'https://picsum.photos/seed/netflix-hero/1920/1080'
            }
            alt="Hero Background"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#141414]" />
        </div>

        <div className="absolute bottom-[25%] left-4 md:left-12 max-w-2xl space-y-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center font-bold text-[10px] text-black">
              N
            </div>
            <span className="text-gray-300 font-bold tracking-[0.3em] text-xs uppercase">
              Series
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            {heroMovie?.title || t('home.hero_title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 drop-shadow-lg line-clamp-3"
          >
            {heroMovie?.overview || t('home.hero_subtitle')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 pt-2"
          >
            <button
              onClick={() => heroMovie && navigate(`/movie/${heroMovie.id}`)}
              className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-white/90 transition shadow-lg"
            >
              <FaPlay size={16} />
              {t('home.play')}
            </button>
            <button
              onClick={() => heroMovie && navigate(`/movie/${heroMovie.id}`)}
              className="flex items-center gap-2 bg-white/20 text-white px-8 py-2.5 rounded font-bold hover:bg-white/30 transition backdrop-blur-md border border-white/10"
            >
              <FaInfo size={16} />
              {t('home.more_info')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="px-4 md:px-12 -mt-32 relative z-10 pb-20 space-y-12">
        <MovieRow title={t('movies.trending')} data={movies} />
        <MovieRow title={t('movies.animations')} data={animations} />
        <MovieRow title={t('movies.doramas')} data={doramas} />
        <MovieRow title={t('movies.action')} data={actionMovies} />
        <MovieRow title={t('movies.adventure')} data={adventureMovies} />
        <MovieRow title={t('movies.comedy')} data={comedyMovies} />
        <MovieRow title={t('movies.top_rated')} data={[...movies].reverse()} />

        <section className="pt-20 border-t border-white/5">
          <Accordion />
        </section>
      </div>
    </div>
  );
};

export default Home;