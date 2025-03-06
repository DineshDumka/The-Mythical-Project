// src/components/authorityPortal/AuthorityPortal.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthorityDashboard from "./AurthorityDashboard";
import ComplaintsList from "./ComplaintsList"
import ComplaintDetails from "../userPortal/ComplaintDetails";
import Settings from "../userPortal/Settings";

const AuthorityPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Officer Smith");
  const [userAvatar, setUserAvatar] = useState("https://randomuser.me/api/portraits/men/42.jpg");
  const [userDepartment, setUserDepartment] = useState("Police Department");

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate("/login");
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-blue-800 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-white mr-2">🚨</span>
                <span className="font-bold text-xl text-white">SmartAlert</span>
                <span className="ml-2 text-sm bg-blue-700 text-white px-2 py-1 rounded">Authority</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/authority/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/authority/dashboard")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/authority/complaints"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/authority/complaints")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Complaints
              </Link>
              <Link
                to="/authority/settings"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/authority/settings")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-blue-100 bg-blue-700 hover:bg-blue-600"
              >
                Logout
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="hidden md:flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="mr-3 text-right">
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-blue-200">{userDepartment}</p>
                  </div>
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                    src={userAvatar}
                    alt={userName}
                  />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-800 border-t border-blue-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center px-3 py-2">
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                  src={userAvatar}
                  alt={userName}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-blue-200">{userDepartment}</p>
                </div>
              </div>
              <Link
                to="/authority/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/authority/dashboard")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/authority/complaints"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/authority/complaints")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Complaints
              </Link>
              <Link
                to="/authority/settings"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/authority/settings")
                    ? "bg-blue-900 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 rounded-md text-base font-medium text-blue-100 bg-blue-700 hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<AuthorityDashboard />} />
            <Route path="/dashboard" element={<AuthorityDashboard />} />
            <Route path="/complaints" element={<ComplaintsList />} />
            <Route path="/complaints/:id" element={<ComplaintDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AuthorityPortal;
