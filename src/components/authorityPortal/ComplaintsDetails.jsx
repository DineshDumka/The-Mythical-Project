// src/components/authorityPortal/ComplaintDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch complaint details
    setIsLoading(true);
    setTimeout(() => {
      // Mock data - in a real app, you would fetch this from your API
      const mockComplaint = {
        id: id,
        title: "Water Leakage in Main Street",
        description: "There is a major water leakage on Main Street near the grocery store. The water has been flowing continuously for the past 3 days and is causing damage to the road. Several vehicles have reported issues navigating through this area. Immediate attention is required.",
        status: "Pending",
        date: "2023-07-15",
        category: "Infrastructure",
        priority: "High",
        location: "123 Main St, Cityville",
        coordinates: { lat: 40.7128, lng: -74.006 },
        submittedBy: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "555-123-4567",
          userId: "user123",
        },
        images: [
          "https://via.placeholder.com/800x600.png?text=Water+Leakage+Photo+1",
          "https://via.placeholder.com/800x600.png?text=Water+Leakage+Photo+2",
        ],
        timeline: [
          { date: "2023-07-15 09:30 AM", status: "Submitted", by: "John Doe" },
          { date: "2023-07-15 10:15 AM", status: "Received", by: "System" },
          { date: "2023-07-15 11:45 AM", status: "Under Review", by: "Officer Smith" },
        ],
      };
      
      const mockComments = [
        {
          id: 1,
          text: "I've assigned this to the water department for immediate action.",
          author: "Officer Smith",
          date: "2023-07-15 11:50 AM",
          isAuthority: true,
        },
        {
          id: 2,
          text: "Thank you for the quick response. The situation is getting worse.",
          author: "John Doe",
          date: "2023-07-15 12:30 PM",
          isAuthority: false,
        },
        {
          id: 3,
          text: "Water department team has been dispatched and should arrive within the hour.",
          author: "Officer Smith",
          date: "2023-07-15 01:15 PM",
          isAuthority: true,
        },
      ];
      
      setComplaint(mockComplaint);
      setComments(mockComments);
      setStatusUpdate(mockComplaint.status);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusChange = (e) => {
    setStatusUpdate(e.target.value);
  };

  const handleUpdateStatus = () => {
    // In a real app, you would send this update to your API
    setIsLoading(true);
    
    setTimeout(() => {
      setComplaint({
        ...complaint,
        status: statusUpdate,
        timeline: [
          ...complaint.timeline,
          {
            date: new Date().toLocaleString(),
            status: statusUpdate,
            by: "Officer Smith",
          },
        ],
      });
      
      // Add a system comment about the status change
      const newComment = {
        id: comments.length + 1,
        text: `Status updated to "${statusUpdate}"`,
        author: "Officer Smith",
        date: new Date().toLocaleString(),
        isAuthority: true,
        isSystem: true,
      };
      
      setComments([...comments, newComment]);
      setUpdateSuccess(true);
      setIsLoading(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleAddComment = () => {
    if (comment.trim() === "") return;
    
    setIsLoading(true);
    
    // In a real app, you would send this comment to your API
    setTimeout(() => {
      const newComment = {
        id: comments.length + 1,
        text: comment,
        author: "Officer Smith",
        date: new Date().toLocaleString(),
        isAuthority: true,
      };
      
      setComments([...comments, newComment]);
      setComment("");
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading && !complaint) {
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
        <div className="flex items-center mb-6">
          <button
            onClick={goBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complaint Details</h1>
        </div>

        {updateSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Complaint status successfully updated to <span className="font-medium">{complaint.status}</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Complaint Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Complaint #{complaint.id}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                complaint.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                complaint.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-green-100 text-green-800"
              }`}>
                {complaint.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{complaint.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-medium">{complaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Priority</p>
                  <p className="font-medium">{complaint.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                  <p className="font-medium">{complaint.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium">{complaint.location}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700 whitespace-pre-line">{complaint.description}</p>
              </div>
              
              {complaint.images && complaint.images.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Attached Images</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {complaint.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Complaint image ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Submitted By</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{complaint.submittedBy.name}</p>
                  <p className="text-sm text-gray-600">{complaint.submittedBy.email}</p>
                  <p className="text-sm text-gray-600">{complaint.submittedBy.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Timeline</p>
                <div className="relative">
                  {complaint.timeline.map((event, index) => (
                    <div key={index} className="mb-4 flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full h-3 w-3 bg-blue-500"></div>
                        {index < complaint.timeline.length - 1 && (
                          <div className="h-full w-0.5 bg-gray-200"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.status}</p>
                        <p className="text-xs text-gray-500">
                          {event.date} by {event.by}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Update and Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Status Update */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Update Status</h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={statusUpdate}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={isLoading || statusUpdate === complaint.status}
                  className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isLoading || statusUpdate === complaint.status
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Status"
                  )}
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Comments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg ${
                        comment.isSystem
                          ? "bg-gray-50 border border-gray-200"
                          : comment.isAuthority
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">
                          {comment.author}
                          {comment.isAuthority && !comment.isSystem && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Authority
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Add Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your comment here..."
                    disabled={isLoading}
                  ></textarea>
                </div>
                <button
                  onClick={handleAddComment}
                  disabled={isLoading || comment.trim() === ""}
                  className={`mt-2 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isLoading || comment.trim() === ""
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "Add Comment"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintDetails;
