// src/components/userPortal/Map.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Replace with your actual Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2s1cXJ5bXFpMDdtMDNtbW4yOGdrYmtweiJ9.ywtVk6ggXzYHGjEOoIdIrQ";

const incidentTypes = {
  "Infrastructure": { color: "#3b82f6", icon: "wrench" }, // Blue
  "Traffic": { color: "#f59e0b", icon: "car" }, // Amber
  "Security": { color: "#ef4444", icon: "shield" }, // Red
  "Fire": { color: "#dc2626", icon: "fire" }, // Red
  "Medical": { color: "#10b981", icon: "medical" }, // Green
  "Weather": { color: "#8b5cf6", icon: "cloud" }, // Purple
  "Other": { color: "#6b7280", icon: "alert" }, // Gray
};

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    timeframe: "all",
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    lng: -73.9712,
    lat: 40.7395,
    zoom: 12,
  });

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.lng, viewport.lat],
      zoom: viewport.zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right"
    );

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => map.current.remove();
  }, []);

  // Fetch mock incident data
  useEffect(() => {
    // Simulate API call to fetch incidents
    setTimeout(() => {
      const mockIncidents = [
        {
          id: "1",
          title: "Water Leakage in Main Street",
          description: "Major water leakage causing traffic issues",
          type: "Infrastructure",
          status: "In Progress",
          date: "2023-06-15",
          coordinates: [-73.9866, 40.7306],
          priority: "High",
        },
        {
          id: "2",
          title: "Broken Traffic Light at 5th Avenue",
          description: "Traffic light not working at intersection",
          type: "Traffic",
          status: "Pending",
          date: "2023-06-10",
          coordinates: [-73.9501, 40.7435],
          priority: "Medium",
        },
        {
          id: "3",
          title: "Suspicious Activity in Central Park",
          description: "Suspicious individuals near playground",
          type: "Security",
          status: "Resolved",
          date: "2023-06-05",
          coordinates: [-73.9654, 40.7829],
          priority: "High",
        },
        {
          id: "4",
          title: "Fire Reported in Apartment Building",
          description: "Small fire reported in kitchen of apartment 3B",
          type: "Fire",
          status: "In Progress",
          date: "2023-06-16",
          coordinates: [-73.9879, 40.7575],
          priority: "High",
        },
        {
          id: "5",
          title: "Medical Emergency at Shopping Mall",
          description: "Elderly person collapsed near food court",
          type: "Medical",
          status: "Resolved",
          date: "2023-06-14",
          coordinates: [-73.9612, 40.7128],
          priority: "High",
        },
      ];
      setIncidents(mockIncidents);
    }, 1000);
  }, []);

  // Add markers to map when incidents or map changes
  useEffect(() => {
    if (!mapLoaded || incidents.length === 0) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll(".incident-marker");
    existingMarkers.forEach((marker) => marker.remove());

    // Filter incidents based on user selections
    const filteredIncidents = incidents.filter((incident) => {
      const typeMatch = filters.type === "all" || incident.type === filters.type;
      const statusMatch = filters.status === "all" || incident.status === filters.status;
      
      // Time filtering logic
      let timeMatch = true;
      if (filters.timeframe !== "all") {
        const incidentDate = new Date(incident.date);
        const now = new Date();
        const daysDiff = Math.floor((now - incidentDate) / (1000 * 60 * 60 * 24));
        
        if (filters.timeframe === "today" && daysDiff > 0) timeMatch = false;
        if (filters.timeframe === "week" && daysDiff > 7) timeMatch = false;
        if (filters.timeframe === "month" && daysDiff > 30) timeMatch = false;
      }
      
      return typeMatch && statusMatch && timeMatch;
    });

    // Add markers for filtered incidents
    filteredIncidents.forEach((incident) => {
      const { color } = incidentTypes[incident.type] || incidentTypes["Other"];
      
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "incident-marker";
      el.style.width = "25px";
      el.style.height = "25px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = color;
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
      el.style.cursor = "pointer";
      
      // Add pulse effect for high priority incidents
      if (incident.priority === "High" && incident.status !== "Resolved") {
        el.style.animation = "pulse 1.5s infinite";
        const keyframes = `
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(${color}, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(${color}, 0); }
            100% { box-shadow: 0 0 0 0 rgba(${color}, 0); }
          }
        `;
        const style = document.createElement("style");
        style.innerHTML = keyframes;
        document.head.appendChild(style);
      }

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(incident.coordinates)
        .addTo(map.current);

      // Add click event
      el.addEventListener("click", () => {
        setSelectedIncident(incident);
      });
    });

  }, [incidents, mapLoaded, filters]);

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">Incident Map</h1>
        <p className="text-gray-600">
          View and track incidents across the city in real-time
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
      >
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Type
              </label>
              <select
                id="type-filter"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Types</option>
                {Object.keys(incidentTypes).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Time Frame
              </label>
              <select
                id="time-filter"
                value={filters.timeframe}
                onChange={(e) => handleFilterChange("timeframe", e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div ref={mapContainer} className="h-[600px] w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedIncident ? "Incident Details" : "Recent Incidents"}
              </h3>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "536px" }}>
              {selectedIncident ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{selectedIncident.title}</h4>
                    <button
                      onClick={() => setSelectedIncident(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedIncident.status === "Resolved" ? "bg-green-100 text-green-800" :
                        selectedIncident.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedIncident.status}
                    </span>
                    <span 
                      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedIncident.priority === "High" ? "bg-red-100 text-red-800" :
                        selectedIncident.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedIncident.priority} Priority
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Description</h5>
                      <p className="mt-1 text-sm text-gray-900">{selectedIncident.description}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Type</h5>
                      <p className="mt-1 text-sm text-gray-900">{selectedIncident.type}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Date Reported</h5>
                      <p className="mt-1 text-sm text-gray-900">{selectedIncident.date}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Coordinates</h5>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedIncident.coordinates[1].toFixed(4)}, {selectedIncident.coordinates[0].toFixed(4)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {incidents.length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Loading incidents...</h3>
                    </div>
                  ) : (
                    incidents.map((incident) => (
                      <div 
                        key={incident.id} 
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedIncident(incident)}
                      >
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{incident.title}</h4>
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              incident.status === "Resolved" ? "bg-green-100 text-green-800" :
                              incident.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}
                          >
                            {incident.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{incident.date} • {incident.type}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Map;
