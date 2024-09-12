import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl font-bold">Eventify</h2>
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Eventify. All Rights Reserved.
        </p>
      </div>
      <div className="flex space-x-6">
        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
          <FaFacebookF />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gray-400">
          <FaTwitter />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer