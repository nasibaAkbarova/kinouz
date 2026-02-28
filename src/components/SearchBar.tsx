import React, { useState } from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('movies.search_placeholder')}
        className="w-full bg-zinc-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-white/30 transition text-white"
      />
    </form>
  );
};

export default SearchBar;
