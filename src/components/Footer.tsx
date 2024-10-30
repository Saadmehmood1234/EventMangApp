import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full bg-[#377885] text-white py-8 mt-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl text-[#d35b77] font-bold">Eventify</h2>
        <p className="text-white">
          &copy; {new Date().getFullYear()} Eventify. All Rights Reserved.
        </p>
        <p className="text-white">
       Develop By  Saad Mehmood & Tahir Khan
        </p>
      </div>
      <div className="flex space-x-6">
        <a href="#" aria-label="Facebook" className="hover:text-[#cc2b50]">
          <FaFacebookF />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-[#cc2b50]">
          <FaTwitter />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-[#cc2b50]">
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer