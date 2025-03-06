// src/components/userPortal/ComplaintDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch complaint details
    setIsLoading(true);
    setTimeout(() => {
      // Mock data - in a real app, you would fetch this from your API
      const mockComplaint = {
        id: id,
        title: "Water Leakage in Main Street",
        description: "There is a major water leakage on Main Street near the grocery store. Water has been flowing for over 3 hours and is causing traffic issues.",
        status: "In Progress",
        date: "2023-06-15",
        type: "Accident",
        location: "123 Main St, Cityville",
        image: "https://images.unsplash.com/photo-1583001809873-a128495da465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        statusColor: "bg-yellow-100 text-yellow-800",
        updates: [
          {
            date: "2023-06-15 09:30 AM",
            message: "Complaint received and assigned to Water Department",
            author: "System"
          },
          {
            date: "2023-06-15 10:15 AM",
            message: "Technician dispatched to the location",
            author: "John Smith, Dispatcher"
          },
          {
            date: "2023-06-15 11:45 AM",
            message: "Identified broken water main. Repair team requested.",
            author: "Mike Johnson, Technician"
          }
        ]
      };
      
      setComplaint(mockComplaint);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSending(true);
    
    // Simulate API call to post comment
    setTimeout(() => {
      const newUpdate = {
        date: new Date().toLocaleString(),
        message: newComment,
        author: "You (Citizen)"
      };
      
      setComplaint({
        ...complaint,
        updates: [...complaint.updates, newUpdate]
      });
      
      setNewComment("");
      setIsSending(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Complaint Not Found</h3>
          <p className="mt-1 text-gray-500">The complaint you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/portal/complaints")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Complaints
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <button
            onClick={() => navigate("/portal/complaints")}
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Complaints
          </button>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${complaint.statusColor}`}>
          {complaint.status}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-900">{complaint.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on {complaint.date} • Complaint ID: {complaint.id}
          </p>
        </div>
        
        <div className="p-6">
          {complaint.image && (
            <div className="mb-6">
              <img 
                src={complaint.image} 
                alt="Complaint evidence" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Incident Type</h3>
              <p className="mt-1 text-base text-gray-900">{complaint.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 text-base text-gray-900">{complaint.location}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-base text-gray-900">{complaint.description}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Status Updates</h2>
        </div>
        
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {complaint.updates.map((update, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== complaint.updates.length - 1 ? (
                      <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center ring-8 ring-white">
                          <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{update.author}</span> • {update.date}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{update.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Add Comment</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Your Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add any additional information or questions about your complaint..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSending || !newComment.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Submit Comment"
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 flex justify-end"
      >
        <button
          onClick={() => navigate("/portal/complaints")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-4"
        >
          Back to Complaints
        </button>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Contact Support
        </button>
      </motion.div>
    </div>
  );
};

export default ComplaintDetails;
