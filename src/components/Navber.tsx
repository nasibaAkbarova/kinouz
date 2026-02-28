import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaBell, FaUser, FaBars, FaTimes, FaSignOutAlt, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { 
      name: t('nav.movies'), 
      path: '/movies',
      dropdown: [
        { name: t('movies.action'), id: 28 },
        { name: t('movies.adventure'), id: 12 },
        { name: t('movies.comedy'), id: 35 },
        { name: "Drama", id: 18 },
      ]
    },
    { name: t('nav.favorites'), path: '/favorites' },
    { name: t('nav.about'), path: '/about' },
  ];

  const handleNotificationClick = () => {
    toast.info('Sizda yangi bildirishnomalar yo\'q');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-red-600 text-3xl font-bold tracking-tighter">KIV</Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link 
                  to={link.path} 
                  className={`text-sm transition hover:text-gray-300 flex items-center gap-1 ${location.pathname === link.path ? 'font-bold text-white' : 'text-gray-200'}`}
                >
                  {link.name}
                  {link.dropdown && (
                    <FaChevronDown className="opacity-50 group-hover:rotate-180 transition-transform" size={10} />
                  )}
                </Link>
                
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-[#141414] border border-white/10 rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.id}
                        to={`/movies?genre=${item.id}`}
                        className="block px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <form onSubmit={handleSearch} className={`flex items-center bg-black/40 border border-white/20 rounded px-2 py-1 transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10 overflow-hidden'}`}>
              <FaSearch 
                className="cursor-pointer hover:text-gray-300 shrink-0" 
                size={18} 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              {isSearchOpen && (
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Qidirish..." 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-white"
                />
              )}
            </form>
            
            <FaBell className="cursor-pointer hover:text-gray-300" size={18} onClick={handleNotificationClick} />
            
            <Link to="/favorites" className="relative group">
              <FaHeart className={`cursor-pointer transition-colors ${location.pathname === '/favorites' ? 'text-red-600' : 'hover:text-red-500'}`} size={18} />
              {favorites.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </div>
              )}
            </Link>

            <select 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent border border-white/20 rounded px-2 py-1 text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="uz" className="bg-[#141414]">UZ</option>
              <option value="ru" className="bg-[#141414]">RU</option>
              <option value="en" className="bg-[#141414]">EN</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block text-xs text-gray-400 max-w-100px truncate">
              {user}
            </div>
            <div className="group relative">
              <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer flex items-center justify-center">
                <FaUser size={16} />
              </div>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-white/10 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 border-b border-white/10">
                  <p className="text-sm font-bold truncate">{user}</p>
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 p-4 text-sm hover:bg-white/5 transition text-red-500"
                >
                  <FaSignOutAlt size={16} /> Chiqish
                </button>
              </div>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-white/10 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-200 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <Link 
              to="/favorites" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-lg font-medium text-gray-200 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <FaHeart size={20} className={favorites.length > 0 ? 'text-red-600' : ''} />
                {t('nav.favorites')}
              </div>
              {favorites.length > 0 && (
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </div>
              )}
            </Link>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <FaUser size={16} /> {user}
            </div>
            <select 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-zinc-800 border border-white/20 rounded px-4 py-2 text-sm font-semibold outline-none"
            >
              <option value="uz">Uzbek</option>
              <option value="ru">Russian</option>
              <option value="en">English</option>
            </select>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-red-500 font-bold"
            >
              <FaSignOutAlt size={18} /> Chiqish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;