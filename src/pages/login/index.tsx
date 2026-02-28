import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const identifier = location.state?.identifier || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock password check
    if (password === '123456') {
      login(identifier);
      toast.success('Xush kelibsiz!');
      navigate('/');
    } else {
      toast.error('Parol noto\'g\'ri! (Parol: 123456)');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative">
       <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/login-bg/1920/1080?blur=5"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 bg-black/75 p-10 md:p-16 rounded-lg w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold mb-8">Kirish</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Login (Email yoki Tel)</label>
            <input
              type="text"
              value={identifier}
              disabled
              className="w-full p-4 bg-[#333] rounded border-none text-white opacity-70"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Parol</label>
            <input
              type="password"
              placeholder="Parolni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-[#333] rounded border-none text-white focus:ring-2 focus:ring-red-600 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-4 rounded font-bold text-lg mt-4"
          >
            Kirish
          </button>
        </form>
        <p className="mt-8 text-gray-500">
          Yangi foydalanuvchimisiz? <span className="text-white hover:underline cursor-pointer">Hozir ro'yxatdan o'ting.</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
