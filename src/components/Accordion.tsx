import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-[#2d2d2d] hover:bg-[#414141] transition-colors text-left text-xl md:text-2xl"
      >
        <span>{title}</span>
        {isOpen ? <FaTimes size={28} /> : <FaPlus size={28} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#2d2d2d] mt-1px"
          >
            <div className="p-6 text-xl md:text-2xl border-t border-black">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC = () => {
  const faqs = [
    {
      title: "KivMovies nima?",
      content: "KivMovies - bu minglab internetga ulangan qurilmalarda turli xil mukofotga sazovor bo'lgan teleko'rsatuvlar, filmlar, animatsiyalar, hujjatli filmlar va boshqalarni taklif qiluvchi striming xizmatidir."
    },
    {
      title: "KivMovies qancha turadi?",
      content: "KivMovies-ni smartfoningiz, planshetingiz, Smart TV, noutbukingiz yoki striming qurilmangizda bitta oylik to'lov evaziga tomosha qiling. Rejalar oyiga 7,99 dollardan 15,99 dollargacha."
    },
    {
      title: "Qayerda tomosha qilishim mumkin?",
      content: "Istalgan vaqtda, istalgan joyda tomosha qiling. Shaxsiy kompyuteringizdan kivmovies.com saytida yoki internetga ulangan har qanday qurilmada, jumladan smart-televizorlar, smartfonlar, planshetlar va boshqalarda darhol tomosha qilish uchun KivMovies hisobingiz bilan tizimga kiring."
    },
    {
      title: "Qanday qilib bekor qilaman?",
      content: "KivMovies moslashuvchan. Hech qanday zerikarli shartnomalar va majburiyatlar yo'q. Hisobingizni onlayn ravishda ikki marta bosish orqali osongina bekor qilishingiz mumkin. Bekor qilish uchun to'lov yo'q - hisobingizni istalgan vaqtda boshlang yoki to'xtating."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">Tez-tez beriladigan savollar</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} title={faq.title} content={faq.content} />
        ))}
      </div>
    </div>
  );
};

export default Accordion;