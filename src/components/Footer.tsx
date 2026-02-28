import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#141414] pt-20 pb-10 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 mb-8">
          <FaFacebookF className="cursor-pointer hover:text-gray-400" />
          <FaInstagram className="cursor-pointer hover:text-gray-400" />
          <FaTwitter className="cursor-pointer hover:text-gray-400" />
          <FaYoutube className="cursor-pointer hover:text-gray-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm text-gray-500">
          <div className="space-y-3">
            <p className="hover:underline cursor-pointer">Audio Description</p>
            <p className="hover:underline cursor-pointer">Investor Relations</p>
            <p className="hover:underline cursor-pointer">Legal Notices</p>
          </div>
          <div className="space-y-3">
            <p className="hover:underline cursor-pointer">Help Center</p>
            <p className="hover:underline cursor-pointer">Jobs</p>
            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
          </div>
          <div className="space-y-3">
            <p className="hover:underline cursor-pointer">Gift Cards</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
            <p className="hover:underline cursor-pointer">Corporate Information</p>
          </div>
          <div className="space-y-3">
            <p className="hover:underline cursor-pointer">Media Center</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Contact Us</p>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          <p>© 1997-2024 KivMovies, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
