// src/components/userPortal/UserPortal.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Dashboard from "./Dashboard";
import MyComplaints from "./MyComplaints";
import ComplaintDetails from "./ComplaintDetails";
import Profile from "./Profile";
import Settings from "./Settings";
import Map from "./Map";

const UserPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [userAvatar, setUserAvatar] = useState("https://randomuser.me/api/portraits/men/32.jpg");

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary-600 mr-2">🚨</span>
                <span className="font-bold text-xl text-gray-900">SmartAlert</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/portal/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/portal/dashboard")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/portal/complaints"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/portal/complaints")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                My Complaints
              </Link>
              <Link
                to="/portal/map"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/portal/map")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Incident Map
              </Link>
              <Link
                to="/portal/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/portal/profile")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/portal/settings"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/portal/settings")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Logout
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="hidden md:flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={userAvatar}
                    alt={userName}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
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
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center px-3 py-2">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userAvatar}
                  alt={userName}
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
              </div>
              <Link
                to="/portal/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/portal/dashboard")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/portal/complaints"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/portal/complaints")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                My Complaints
              </Link>
              <Link
                to="/portal/map"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/portal/map")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Incident Map
              </Link>
              <Link
                to="/portal/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/portal/profile")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/portal/settings"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/portal/settings")
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<MyComplaints />} />
            <Route path="/complaints/:id" element={<ComplaintDetails />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default UserPortal;
