// src/components/ComplaintForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    incidentType: "",
    location: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          alert("Unable to retrieve your location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically send the data to your backend
    alert("Complaint submitted successfully!");
    // Reset form
    setFormData({
      title: "",
      description: "",
      incidentType: "",
      location: "",
      image: null,
    });
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100"
      >
       <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-8 px-8">
  <h2 className="text-3xl font-extrabold text-white tracking-tight">
    REPORT AN INCIDENT
  </h2>
  <p className="text-primary-100 mt-2 text-lg">
    Help us improve safety by reporting any emergencies or incidents you witness.
  </p>
</div>

        
        <div className="p-8">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="title" className="block text-sm font-bold text-gray-700">
                  Title of Complaint <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200"
                  placeholder="Brief title describing the incident"
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label htmlFor="incidentType" className="block text-sm font-bold text-gray-700">
                  Incident Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="incidentType"
                  id="incidentType"
                  required
                  value={formData.incidentType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200"
                >
                  <option value="">Select incident type</option>
                  <option value="Fire">Fire</option>
                  <option value="Accident">Accident</option>
                  <option value="Theft">Theft</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-bold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200"
                  placeholder="Please provide detailed information about the incident"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="location" className="block text-sm font-bold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Address or coordinates of the incident"
                    className="block w-full rounded-l-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={getLocation}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="ml-2">{isLoading ? "Loading..." : "Get Location"}</span>
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Click "Get Location" to automatically fill using your current location</p>
              </div>

              <div className="col-span-2">
                <label htmlFor="image" className="block text-sm font-bold text-gray-700">
                  Upload Image (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    <span>Upload a file</span>
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {formData.image ? formData.image.name : "No file chosen"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                
                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-sm font-bold text-gray-700 mb-1">Image Preview:</p>
                    <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-300 shadow-md">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setFormData({...formData, image: null});
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-6 border border-red-500 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-all duration-200"
                >
                  Submit Complaint
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintForm;
