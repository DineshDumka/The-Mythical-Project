// src/components/userPortal/MyComplaints.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call to fetch complaints
    setIsLoading(true);
    setTimeout(() => {
      // Mock data - in a real app, you would fetch this from your API
      const mockComplaints = [
        {
          id: "1",
          title: "Water Leakage in Main Street",
          description: "There is a major water leakage on Main Street near the grocery store.",
          status: "In Progress",
          date: "2023-06-15",
          type: "Infrastructure",
          location: "123 Main St, Cityville",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "2",
          title: "Broken Traffic Light at 5th Avenue",
          description: "The traffic light at the intersection of 5th Avenue and Oak Street is not working.",
          status: "Pending",
          date: "2023-06-10",
          type: "Traffic",
          location: "5th Ave & Oak St, Cityville",
          statusColor: "bg-red-100 text-red-800",
        },
        {
          id: "3",
          title: "Suspicious Activity in Central Park",
          description: "Noticed suspicious individuals loitering near the playground in Central Park.",
          status: "Resolved",
          date: "2023-06-05",
          type: "Security",
          location: "Central Park, Cityville",
          statusColor: "bg-green-100 text-green-800",
        },
        {
          id: "4",
          title: "Pothole on Riverside Drive",
          description: "Large pothole causing traffic issues and potential vehicle damage.",
          status: "Resolved",
          date: "2023-05-28",
          type: "Infrastructure",
          location: "Riverside Dr, Cityville",
          statusColor: "bg-green-100 text-green-800",
        },
        {
          id: "5",
          title: "Noise Complaint - Construction Site",
          description: "Construction noise outside permitted hours at the new building site.",
          status: "Pending",
          date: "2023-06-12",
          type: "Noise",
          location: "456 Pine St, Cityville",
          statusColor: "bg-red-100 text-red-800",
        },
      ];
      
      setComplaints(mockComplaints);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter complaints based on status and search query
  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === "all" || 
      (filter === "pending" && complaint.status === "Pending") ||
      (filter === "inProgress" && complaint.status === "In Progress") ||
      (filter === "resolved" && complaint.status === "Resolved");
    
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
        <p className="text-gray-600">
          View and manage all your submitted complaints
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Status
                </label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Complaints</option>
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="w-full sm:w-64">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search complaints..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/report"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Complaint
            </Link>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-12 text-center"
        >
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No complaints found</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery ? "Try adjusting your search or filter criteria." : "You haven't submitted any complaints yet."}
          </p>
          <div className="mt-6">
            <Link
              to="/report"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Submit a Complaint
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{complaint.title}</h3>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${complaint.statusColor}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <span className="mr-4">ID: {complaint.id}</span>
                      <span className="mr-4">Date: {complaint.date}</span>
                      <span>Type: {complaint.type}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
                    <p className="mt-1 text-sm text-gray-500">Location: {complaint.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/portal/complaints/${complaint.id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
