import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from './logo.jpg'; 

const HeroSection = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({
    from: "from-indigo-600",
    to: "to-purple-800"
  });

  useEffect(() => {
    // Get user's location for weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        error => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          // Use default weather data
          fetchWeatherData(40.7128, -74.0060); // Default: New York
        }
      );
    } else {
      setIsLoading(false);
      fetchWeatherData(40.7128, -74.0060); // Default: New York
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const API_KEY = "36f1eaeecd891fa7e06dee8cb935fbd3cb317edb";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      const timeOfDay = getTimeOfDay();
      setBackgroundStyle(getBackgroundStyle(weatherCondition, timeOfDay));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoading(false);
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 21) return "evening";
    return "night";
  };

  const getBackgroundStyle = (weather, time) => {
    const backgrounds = {
      clear: {
        morning: { from: "from-blue-400", to: "to-indigo-500" },
        afternoon: { from: "from-blue-500", to: "to-indigo-600" },
        evening: { from: "from-orange-400", to: "to-purple-600" },
        night: { from: "from-indigo-900", to: "to-purple-900" }
      },
      clouds: {
        morning: { from: "from-gray-300", to: "to-blue-400" },
        afternoon: { from: "from-gray-400", to: "to-blue-500" },
        evening: { from: "from-gray-500", to: "to-indigo-600" },
        night: { from: "from-gray-800", to: "to-indigo-900" }
      },
      rain: {
        morning: { from: "from-gray-400", to: "to-blue-600" },
        afternoon: { from: "from-gray-500", to: "to-blue-700" },
        evening: { from: "from-gray-600", to: "to-indigo-800" },
        night: { from: "from-gray-900", to: "to-indigo-950" }
      },
      snow: {
        morning: { from: "from-gray-100", to: "to-blue-200" },
        afternoon: { from: "from-gray-200", to: "to-blue-300" },
        evening: { from: "from-gray-300", to: "to-indigo-400" },
        night: { from: "from-gray-700", to: "to-indigo-800" }
      },
      thunderstorm: {
        morning: { from: "from-gray-600", to: "to-purple-700" },
        afternoon: { from: "from-gray-700", to: "to-purple-800" },
        evening: { from: "from-gray-800", to: "to-purple-900" },
        night: { from: "from-gray-900", to: "to-purple-950" }
      },
      default: { from: "from-indigo-600", to: "to-purple-800" }
    };

    let condition = "default";
    if (weather.includes("clear")) condition = "clear";
    else if (weather.includes("cloud")) condition = "clouds";
    else if (weather.includes("rain") || weather.includes("drizzle")) condition = "rain";
    else if (weather.includes("snow")) condition = "snow";
    else if (weather.includes("thunderstorm")) condition = "thunderstorm";

    return backgrounds[condition]?.[time] || backgrounds.default;
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${backgroundStyle.from} ${backgroundStyle.to} text-white overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] bg-repeat"></div>
      </div>

      {weatherData && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm">
          <div className="flex items-center">
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
              alt={weatherData.weather[0].description}
              className="w-8 h-8"
            />
            <div className="ml-1">
              <p className="font-bold">{Math.round(weatherData.main.temp)}°C</p>
              <p className="capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              Smart City Emergency Response System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
            >
              Real-time incident detection, fast alerts, and quick response. Empowering cities to stay safe with AI-driven technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                onClick={() => navigate('/report')}
              >
                Report an Incident
              </button>
              <button className="bg-white/10 text-white hover:bg-white/20 font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">
                <img src={logo} alt="Smart City Emergency Response System" />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-gray-300">Active Alerts</div>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-gray-300">Response Time</div>
                    <div className="text-2xl font-bold">4.2 min</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
