import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface GenreFilterProps {
  selectedGenreId: number | null;
  onGenreSelect: (id: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenreId, onGenreSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const genres = [
    { id: null, name: "All" },
    { id: 28, name: t('movies.action') },
    { id: 12, name: t('movies.adventure') },
    { id: 35, name: t('movies.comedy') },
    { id: 18, name: "Drama" },
    { id: 10765, name: "Sci-Fi" },
    { id: 9648, name: "Mystery" },
    { id: 16, name: t('movies.animations') },
    { id: 80, name: "Crime" }
  ];

  const handleGenreClick = (id: number | null) => {
    if (id) {
      navigate(`/movies?genre=${id}`);
    } else {
      navigate('/movies');
    }
    onGenreSelect(id);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {genres.map((genre) => (
        <button 
          key={genre.id === null ? 'all' : genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className={`whitespace-nowrap px-6 py-2 rounded-full border transition text-sm font-medium ${
            selectedGenreId === genre.id 
              ? 'bg-white text-black border-white' 
              : 'border-white/10 bg-zinc-800/30 hover:bg-zinc-700 text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;