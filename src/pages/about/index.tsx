import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('nav.about')}</h1>
      <div className="space-y-6 text-gray-300 text-lg">
        <p>
          KivMovies - bu sizning sevimli filmlaringiz va seriallaringizni topish uchun eng yaxshi platforma.
        </p>
        <p>
          Bizning maqsadimiz foydalanuvchilarga eng so'nggi va eng mashhur filmlar haqida ma'lumot berishdir.
        </p>
      </div>
    </div>
  );
};

export default About;