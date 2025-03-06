import React from "react";
import Navbar from './components/Navbar';
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
function App() {
  return (
    <div >
   <Navbar />
   <HeroSection/>
   <HowItWorks/>
   <Features/>
   <Testimonials/> 
   <Footer/>
    </div>
  );
}

export default App;
