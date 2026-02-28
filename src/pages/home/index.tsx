import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Info } from 'lucide-react';
import { motion } from 'motion/react';
import MovieCard from '../../app/components/MovieCard';
import { getTrendingMovies, getAnimations, getDoramas, getMoviesByGenre, MovieWithTrailer } from '../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Accordion from '../../app/components/Accordion';

const Home = () => {
  const { t } = useTranslation();
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
        const [moviesData, animationsData, doramasData, actionData, adventureData, comedyData] = await Promise.all([
          getTrendingMovies(),
          getAnimations(),
          getDoramas(),
          getMoviesByGenre(28), // Action
          getMoviesByGenre(12), // Adventure
          getMoviesByGenre(35)  // Comedy
        ]);
        setMovies(moviesData);
        setAnimations(animationsData);
        setDoramas(doramasData);
        setActionMovies(actionData);
        setAdventureMovies(adventureData);
        setComedyMovies(comedyData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
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
            src={heroMovie?.backdrop_path || "https://picsum.photos/seed/netflix-hero/1920/1080"}
            alt="Hero Background"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-[25%] left-4 md:left-12 max-w-2xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center font-bold text-[10px]">N</div>
            <span className="text-gray-300 font-bold tracking-[0.3em] text-xs uppercase">Series</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight"
          >
            {heroMovie?.title || t('home.hero_title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 drop-shadow-lg line-clamp-3"
          >
            {heroMovie?.overview || t('home.hero_subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 pt-2"
          >
            <button className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-white/90 transition shadow-lg">
              <Play fill="black" size={24} />
              {t('home.play')}
            </button>
            <button className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-2.5 rounded font-bold hover:bg-gray-500/40 transition backdrop-blur-md border border-white/10">
              <Info size={24} />
              {t('home.more_info')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="px-4 md:px-12 -mt-32 relative z-10 pb-20 space-y-12">
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.trending')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.animations')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {animations.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.doramas')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {doramas.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.action')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {actionMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.adventure')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {adventureMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.comedy')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {comedyMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-gray-300 cursor-pointer inline-flex items-center gap-2 group">
            {t('movies.top_rated')}
            <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Explore All ›</span>
          </h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="movie-swiper"
          >
            {[...movies].reverse().map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard 
                  id={movie.id} 
                  title={movie.title} 
                  image={movie.poster_path} 
                  trailerUrl={movie.trailer_url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Accordion Section */}
        <section className="pt-20 border-t border-white/5">
           <Accordion />
        </section>
      </div>
    </div>
  );
};

export default Home;