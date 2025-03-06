// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in - in a real app, this would come from your auth context or state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check local storage or session storage for auth token
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleDashboardClick = () => {
    navigate('/portal/dashboard');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600 mr-2">
                🚨
              </span>
              <span
                className={`font-bold text-xl ${
                  isScrolled || isOpen
                    ? "text-gray-900 dark:text-white"
                    : "text-white"
                }`}
              >
                SmartAlert
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {["Home", "Features", "How It Works", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`font-medium hover:text-primary-600 transition-colors ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => navigate('/report')}
                className="btn btn-danger"
              >
                Report Incident
              </button>
              
              {isLoggedIn ? (
                <button
                  onClick={handleDashboardClick}
                  className={`px-4 py-2 rounded-md font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors`}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isScrolled 
                      ? "bg-primary-600 hover:bg-primary-700 text-white" 
                      : "bg-white hover:bg-gray-100 text-primary-600"
                  } transition-colors`}
                >
                  Login
                </button>
              )}

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isScrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"
                } hover:bg-primary-50 dark:hover:bg-gray-700`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 mr-2 rounded-full ${
                isScrolled ? "bg-gray-100 dark:bg-gray-800" : "bg-white/20"
              } hover:bg-primary-50 dark:hover:bg-gray-700`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon
                  className={isScrolled ? "text-gray-700" : "text-white"}
                />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled || isOpen
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-white"
              } hover:text-primary-600 focus:outline-none`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
              className="w-full mt-2 btn btn-danger"
              onClick={() => {
                setIsOpen(false);
                navigate('/report');
              }}
            >
              Report Incident
            </button>
            
            {isLoggedIn ? (
              <button
                className="w-full mt-2 px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/portal/dashboard');
                }}
              >
                Dashboard
              </button>
            ) : (
              <button
                className="w-full mt-2 px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
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
