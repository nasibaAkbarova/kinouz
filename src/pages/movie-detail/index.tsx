import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, MovieWithTrailer } from '../../services/api';
import { Play, Plus, ThumbsUp, ChevronLeft, Check } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { toast } from 'react-toastify';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieWithTrailer | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const playerRef = React.useRef<HTMLDivElement>(null);

  const scrollToPlayer = () => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isEmbeddable = (url: string) => {
    return url.includes('embed') || 
           url.includes('youtube.com') || 
           url.includes('youtu.be') || 
           url.includes('ok.ru') || 
           url.includes('mail.ru');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  const toggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
      toast.info(`"${movie.title}" sevimlilardan olib tashlandi`);
    } else {
      addToFavorites({ 
        id: movie.id, 
        title: movie.title, 
        image: movie.poster_path, 
        trailerUrl: movie.trailer_url 
      });
      toast.success(`"${movie.title}" sevimlilarga qo'shildi`);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      try {
        const data = await getMovieById(Number(id));
        if (data) setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Kino topilmadi</h1>
        <button onClick={() => navigate(-1)} className="text-red-600 hover:underline">Orqaga qaytish</button>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
      >
        <ChevronLeft size={20} /> Orqaga
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3 space-y-8">
          <div ref={playerRef} className="aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl relative group">
            {movie.trailer_url ? (
              isEmbeddable(movie.trailer_url) ? (
                <iframe 
                  src={getEmbedUrl(movie.trailer_url)} 
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={movie.title}
                />
              ) : (
                <video 
                  src={movie.trailer_url} 
                  controls 
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <img 
                src={movie.backdrop_path} 
                alt={movie.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={scrollToPlayer}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/90 transition"
              >
                <Play fill="black" size={20} /> Tomosha qilish
              </button>
              <button 
                onClick={toggleFavorite}
                className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite(movie.id) ? 'bg-white border-white text-black' : 'border-gray-600 text-white hover:border-white'
                }`}
              >
                {isFavorite(movie.id) ? <Check size={24} /> : <Plus size={24} />}
              </button>
              <button 
                onClick={toggleFavorite}
                className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite(movie.id) ? 'bg-red-600 border-red-600 text-white' : 'border-gray-600 text-white hover:border-white'
                }`}
              >
                <ThumbsUp size={24} fill={isFavorite(movie.id) ? "white" : "none"} />
              </button>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
              <div className="flex items-center gap-4 text-gray-400 font-medium">
                <span className="text-green-500">98% Match</span>
                <span>{movie.release_date.split('-')[0]}</span>
                <span className="border border-gray-600 px-2 py-0.5 text-xs rounded">16+</span>
                <span>2h 15m</span>
                <span className="border border-gray-600 px-2 py-0.5 text-xs rounded uppercase">HD</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/3 space-y-8">
           <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 space-y-6">
              <div>
                <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Cast</h3>
                <p className="text-gray-300">Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Genres</h3>
                <p className="text-gray-300">Sci-Fi TV, TV Horror, TV Mysteries</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wider">This show is</h3>
                <p className="text-gray-300">Ominous, Scary, Exciting</p>
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-xl font-bold">O'xshash kinolar</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition">
                    <img src={`https://picsum.photos/seed/similar-${i}/300/450`} alt="Similar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
