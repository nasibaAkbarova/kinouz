
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navber';
import Footer from '../components/Footer';
import './i18n'; 
import { AuthProvider, useAuth } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import LandingPage from '../pages/landing';
import LoginPage from '../pages/login';
import { routes } from './routes/routes';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-[#141414]">
      {isAuthenticated && <Navbar />}
      
      <main className="flex-row">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {routes.map((route) => React.createElement(Route, {
                key: route.id,
                path: route.path,
                element: React.createElement(route.element)
              }))}
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
      
      <ToastContainer 
        aria-label="Notifications"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
