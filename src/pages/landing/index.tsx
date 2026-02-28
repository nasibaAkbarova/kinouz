import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Accordion from '../../components/Accordion';

const LandingPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      navigate('/login', { state: { identifier } });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/netflix-landing/1920/1080?blur=2"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-40 px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mb-6">
          Cheksiz filmlar, seriallar va boshqalar
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Istalgan joyda tomosha qiling. Istalgan vaqtda bekor qiling.
        </p>
        <p className="text-lg md:text-xl mb-6">
          Tomosha qilishga tayyormisiz? A'zo bo'lish yoki obunani qayta tiklash uchun elektron pochta manzilingizni yoki telefon raqamingizni kiriting.
        </p>

        <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Elektron pochta yoki telefon raqami"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="flex-grow p-4 md:p-5 bg-black/50 border border-gray-500 rounded text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition px-8 py-4 md:py-5 rounded text-xl md:text-2xl font-bold flex items-center justify-center gap-2"
          >
            Boshlash <FaChevronRight size={24} />
          </button>
        </form>
      </div>

      {/* Separator */}
      <div className="h-2 bg-[#232323] w-full mt-20" />

      {/* Accordion Section */}
      <Accordion />

      {/* Footer Space */}
      <div className="h-2 bg-[#232323] w-full" />
    </div>
  );
};

export default LandingPage;
