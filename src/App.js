// src/App.js (updated)
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import ComplaintForm from "./components/ComplaintForm";
import UserPortal from "./components/userPortal/UserPortal";
import AuthorityPortal from "./components/authorityPortal/AuthorityPortal";
import Login from "./components/Auth/Login";

// Landing page component that combines all the sections
const LandingPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <Features />
    <Testimonials />
    <Footer />
  </>
);

// Auth guard for protected routes
const ProtectedRoute = ({ children, requiredRole }) => {
  // In a real app, you would check if the user is authenticated
  // For demo purposes, we'll assume the user is authenticated
  const isAuthenticated = true;
  
  // Check user role (for demo purposes)
  const userRole = localStorage.getItem('userRole') || 'User';
  const hasRequiredRole = !requiredRole || userRole === requiredRole;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasRequiredRole) {
    return <Navigate to={userRole === 'Authority' ? "/authority/dashboard" : "/portal/dashboard"} replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/report" element={<ComplaintForm />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route 
          path="/portal/*" 
          element={
            <ProtectedRoute requiredRole="User">
              <UserPortal />
            </ProtectedRoute>
          } 
        />
        
        {/* Authority routes */}
        <Route 
          path="/authority/*" 
          element={
            <ProtectedRoute requiredRole="Authority">
              <AuthorityPortal />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
