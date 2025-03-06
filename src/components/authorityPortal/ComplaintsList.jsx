// src/components/authorityPortal/ComplaintsList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    date: "",
    searchQuery: "",
  });

  useEffect(() => {
    // Simulate API call to fetch complaints
    setIsLoading(true);
    setTimeout(() => {
      // Mock data - in a real app, you would fetch this from your API
      const mockComplaints = [
        {
          id: "C-1001",
          title: "Water Leakage in Main Street",
          description: "There is a major water leakage on Main Street near the grocery store.",
          status: "Pending",
          date: "2023-07-15",
          category: "Infrastructure",
          priority: "High",
          location: "123 Main St, Cityville",
          submittedBy: "John Doe",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "C-1002",
          title: "Traffic Light Malfunction at 5th Avenue",
          description: "The traffic light at the intersection of 5th Avenue and Oak Street is not working properly.",
          status: "In Progress",
          date: "2023-07-14",
          category: "Traffic",
          priority: "Medium",
          location: "5th Ave & Oak St, Cityville",
          submittedBy: "Jane Smith",
          statusColor: "bg-blue-100 text-blue-800",
        },
        {
          id: "C-1003",
          title: "Garbage Collection Missed on Oak Street",
          description: "The garbage collection service has missed our street for two consecutive weeks.",
          status: "Resolved",
          date: "2023-07-12",
          category: "Sanitation",
          priority: "Low",
          location: "Oak Street, Cityville",
          submittedBy: "Robert Johnson",
          statusColor: "bg-green-100 text-green-800",
        },
        {
          id: "C-1004",
          title: "Pothole on Elm Street",
          description: "There's a large pothole on Elm Street that's causing traffic issues and potential vehicle damage.",
          status: "Pending",
          date: "2023-07-15",
          category: "Infrastructure",
          priority: "Medium",
          location: "456 Elm St, Cityville",
          submittedBy: "Sarah Williams",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "C-1005",
          title: "Noise Complaint from Construction Site",
          description: "The construction site on Pine Avenue is operating outside of permitted hours and causing excessive noise.",
          status: "In Progress",
          date: "2023-07-13",
          category: "Noise",
          priority: "Low",
          location: "Pine Avenue, Cityville",
          submittedBy: "Michael Brown",
          statusColor: "bg-blue-100 text-blue-800",
        },
        {
          id: "C-1006",
          title: "Broken Street Light on Maple Road",
          description: "The street light on Maple Road has been broken for over a week, creating safety concerns.",
          status: "Pending",
          date: "2023-07-14",
          category: "Infrastructure",
          priority: "Medium",
          location: "Maple Road, Cityville",
          submittedBy: "Emily Davis",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "C-1007",
          title: "Illegal Dumping at River Park",
          description: "Someone has been dumping construction waste at the River Park area.",
          status: "In Progress",
          date: "2023-07-11",
          category: "Environment",
          priority: "High",
          location: "River Park, Cityville",
          submittedBy: "David Wilson",
          statusColor: "bg-blue-100 text-blue-800",
        },
        {
          // src/components/authorityPortal/ComplaintsList.jsx (continued)
          id: "C-1008",
          title: "Graffiti on Public Library Wall",
          description: "There is extensive graffiti on the north wall of the public library building.",
          status: "Resolved",
          date: "2023-07-10",
          category: "Vandalism",
          priority: "Low",
          location: "Public Library, Cityville",
          submittedBy: "Thomas Anderson",
          statusColor: "bg-green-100 text-green-800",
        },
        {
          id: "C-1009",
          title: "Fallen Tree Blocking Sidewalk",
          description: "A large tree has fallen and is completely blocking the sidewalk on Cedar Lane.",
          status: "Pending",
          date: "2023-07-16",
          category: "Environment",
          priority: "High",
          location: "Cedar Lane, Cityville",
          submittedBy: "Lisa Martinez",
          statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
          id: "C-1010",
          title: "Stray Dogs in Neighborhood",
          description: "There are several stray dogs roaming around the neighborhood, causing concern for residents.",
          status: "In Progress",
          date: "2023-07-15",
          category: "Animal Control",
          priority: "Medium",
          location: "Willow Heights, Cityville",
          submittedBy: "Kevin Taylor",
          statusColor: "bg-blue-100 text-blue-800",
        },
      ];
      
      setComplaints(mockComplaints);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter complaints based on selected filters
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      (filters.status === "" || complaint.status === filters.status) &&
      (filters.category === "" || complaint.category === filters.category) &&
      (filters.date === "" || complaint.date === filters.date) &&
      (filters.searchQuery === "" || 
        complaint.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        complaint.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        complaint.id.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    );
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: "",
      category: "",
      date: "",
      searchQuery: "",
    });
  };

  // Get unique categories for filter dropdown
  const categories = [...new Set(complaints.map((complaint) => complaint.category))];
  
  // Get unique dates for filter dropdown
  const dates = [...new Set(complaints.map((complaint) => complaint.date))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
          <div className="flex space-x-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="searchQuery"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search complaints..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Dates</option>
                {dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Complaints List ({filteredComplaints.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {complaint.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.priority}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.statusColor}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/authority/complaints/${complaint.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No complaints found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredComplaints.length}</span> complaints
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComplaintsList;

