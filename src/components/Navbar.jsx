// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 mr-2">🚨</span>
            <span className={`font-bold text-xl ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
              SmartAlert
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Features", "How It Works", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`font-medium hover:text-primary-600 transition-colors ${
                  isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => handleNavigation('/report')} 
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              Report Incident
            </button>

            {isLoggedIn ? (
              <button 
                onClick={() => handleNavigation('/portal/dashboard')} 
                className="px-4 py-2 rounded-lg bg-black hover:bg-gray-800 text-white font-medium shadow-md transition-all duration-200"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => handleNavigation('/login')} 
                className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200 ${
                  isScrolled 
                    ? "bg-primary-600 hover:bg-primary-700 text-black" 
                    : "bg-blue-500 hover:bg-gray-100 text-primary-600"
                }`}
              >
                Login
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isScrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"
              } hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className={isScrolled ? "text-gray-700" : "text-white"} />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`p-2 mr-2 rounded-full ${
                isScrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"
              } hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className={isScrolled ? "text-gray-700" : "text-white"} />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                isScrolled || isOpen ? "text-gray-700 dark:text-gray-300" : "text-white"
              } hover:text-primary-600 transition-all duration-200`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }} 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["Home", "Features", "How It Works", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}

            <button 
              onClick={() => handleNavigation('/report')} 
              className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              Report Incident
            </button>

            {isLoggedIn ? (
              <button 
                onClick={() => handleNavigation('/portal/dashboard')} 
                className="w-full mt-2 px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 font-medium shadow-md duration-200"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => handleNavigation('/login')} 
                className="w-full mt-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-medium shadow-md transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
