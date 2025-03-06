// src/components/authorityPortal/Settings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const [user, setUser] = useState({
    name: "Officer Smith",
    email: "officer.smith@cityville.gov",
    department: "Police Department",
    phone: "555-123-4567",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("notification_")) {
      const notificationType = name.replace("notification_", "");
      setFormData({
        ...formData,
        notificationPreferences: {
          ...formData.notificationPreferences,
          [notificationType]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to update user settings
    setTimeout(() => {
      setUser(formData);
      setIsEditing(false);
      setIsLoading(false);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this to your backend
      const updatedUser = {
        ...user,
        settings: {
          emailNotifications,
          pushNotifications,
          darkMode,
          language
        }
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsSaving(false);
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and settings
        </p>
      </motion.div>

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">Your settings have been saved successfully.</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900">Email Notifications</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Receive email updates about new complaints and status changes
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`${
                    emailNotifications ? "bg-primary-600" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  role="switch"
                  aria-checked={emailNotifications}
                >
                  <span
                    className={`${
                      emailNotifications ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900">Push Notifications</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Receive push notifications on your device for real-time updates
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`${
                    pushNotifications ? "bg-primary-600" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  role="switch"
                  aria-checked={pushNotifications}
                >
                  <span
                    className={`${
                      pushNotifications ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900">Dark Mode</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Switch between light and dark theme
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`${
                    darkMode ? "bg-primary-600" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  role="switch"
                  aria-checked={darkMode}
                >
                  <span
                    className={`${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  ></span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Language</h4>
              <p className="mt-1 text-sm text-gray-500">
                Select your preferred language
              </p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Authority Profile</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h4 className="text-base font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.department}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                  Change profile photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Privacy & Security</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900">Change Password</h4>
              <p className="mt-1 text-sm text-gray-500">
                Update your password to keep your account secure
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Change Password
              </button>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="mt-1 text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Enable 2FA
              </button>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Data Privacy</h4>
              <p className="mt-1 text-sm text-gray-500">
                Manage how your data is used and stored
              </p>
              <div className="mt-3 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="data-collection"
                      name="data-collection"
                      type="checkbox"
                      defaultChecked={true}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="data-collection" className="font-medium text-gray-700">
                      Allow data collection for service improvement
                    </label>
                    <p className="text-gray-500">
                      We collect anonymous usage data to improve our services
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="location-tracking"
                      name="location-tracking"
                      type="checkbox"
                      defaultChecked={true}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="location-tracking" className="font-medium text-gray-700">
                      Enable location tracking for incident response
                    </label>
                    <p className="text-gray-500">
                      Your location will only be used when responding to incidents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Authority-Specific Settings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900">Default Assignment Department</h4>
              <p className="mt-1 text-sm text-gray-500">
                Set the default department for new complaint assignments
              </p>
              <select
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>Police Department</option>
                <option>Water Department</option>
                <option>Sanitation Department</option>
                <option>Roads & Infrastructure</option>
                <option>Public Health</option>
                <option>Environmental Services</option>
              </select>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Automatic Complaint Assignment</h4>
              <p className="mt-1 text-sm text-gray-500">
                Enable automatic assignment of complaints based on category
              </p>
              <div className="mt-3 flex items-center">
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium text-gray-900">Response Templates</h4>
              <p className="mt-1 text-sm text-gray-500">
                Manage templates for common responses to complaints
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Manage Templates
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Account Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-900">Export Reports</h4>
              <p className="mt-1 text-sm text-gray-500">
                Download reports of complaint data and resolution metrics
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Reports
              </button>
            </div>

            <div>
              <h4 className="text-base font-medium text-red-600">Deactivate Account</h4>
              <p className="mt-1 text-sm text-gray-500">
                Temporarily deactivate your authority account
              </p>
              <button className="mt-3 inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
