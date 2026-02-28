import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown, FaCheck } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  trailerUrl?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, image, trailerUrl }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast.info(`"${title}" sevimlilardan olib tashlandi`);
    } else {
      addToFavorites({ id, title, image, trailerUrl });
      toast.success(`"${title}" sevimlilarga qo'shildi`);
    }
  };

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      className="relative group aspect-2/3 bg-zinc-800 rounded-md overflow-hidden cursor-pointer"
    >
      {!isHovered ? (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full relative">
           {trailerUrl && !trailerUrl.includes('embed') && !trailerUrl.includes('youtube') && !trailerUrl.includes('ok.ru') && !trailerUrl.includes('mail.ru') ? (
             <video 
               src={trailerUrl} 
               autoPlay 
               muted 
               loop 
               className="w-full h-full object-cover"
             />
           ) : (
             <img 
               src={image} 
               alt={title} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           )}
        </div>
      )}
      
      {/* Hover Info Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-3">
          <Link to={`/movie/${id}`} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200">
            <FaPlay color="black" size={14} />
          </Link>
          <button 
            onClick={toggleFavorite}
            className={`w-8 h-8 border-2 rounded-full flex items-center justify-center transition-colors ${
              isFavorite(id) ? 'bg-white border-white text-black' : 'border-gray-400 text-white hover:border-white'
            }`}
          >
            {isFavorite(id) ? <FaCheck size={14} /> : <FaPlus size={14} />}
          </button>
          <button 
            onClick={toggleFavorite}
            className={`w-8 h-8 border-2 rounded-full flex items-center justify-center transition-colors ${
              isFavorite(id) ? 'bg-red-600 border-red-600 text-white' : 'border-gray-400 text-white hover:border-white'
            }`}
          >
            <FaThumbsUp size={14} />
          </button>
          <Link to={`/movie/${id}`} className="ml-auto w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white">
            <FaChevronDown size={14} />
          </Link>
        </div>
        
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
          <span className="text-green-500 font-bold">98% Match</span>
          <span className="border border-gray-500 px-1">16+</span>
          <span>2h 15m</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;