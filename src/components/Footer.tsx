
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-400 text-gray-100 py-10 mt-12 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section: Branding and Info */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">Eventify</h2>
          <p className="text-gray-200 mt-2">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          <p className="text-gray-300">Developed by Saad Mehmood & Tahir Khan</p>
        </div>

        <div className="flex space-x-6 text-gray-100 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="hover:text-indigo-400 transition-colors duration-200">
            <FaFacebookF size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transition-colors duration-200">
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-indigo-400 transition-colors duration-200">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;