// src/components/HowItWorks.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Detection",
    description:
      "AI algorithms detect emergencies from social media, cameras, sensors, or direct user reports through our app.",
    detailedDescription: 
      "Our advanced machine learning models continuously scan multiple data sources including social media feeds, CCTV footage, IoT sensor networks, and citizen reports. The system can identify patterns indicating emergencies such as fires, accidents, or natural disasters within seconds of occurrence.",
    icon: (
      <svg
        className="w-10 h-10 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { label: "Detection Speed", value: "< 30 sec" },
      { label: "Accuracy Rate", value: "94%" },
    ]
  },
  {
    number: "02",
    title: "Verification & Prioritization",
    description:
      "System verifies incident details and assigns priority based on severity, location, and available resources.",
    detailedDescription: 
      "Once detected, our system cross-references multiple data points to verify the incident and eliminate false alarms. Using a sophisticated algorithm, each emergency is assigned a priority level based on factors like potential casualties, infrastructure damage, and resource availability.",
    icon: (
      <svg
        className="w-10 h-10 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { label: "False Alarm Rate", value: "< 2%" },
      { label: "Priority Levels", value: "5" },
    ]
  },
  {
    number: "03",
    title: "Alert Distribution",
    description:
      "Relevant authorities receive instant alerts with critical information and recommended actions.",
    detailedDescription: 
      "Alerts are instantly distributed to the appropriate emergency services based on incident type and location. Each notification includes vital information such as exact coordinates, severity assessment, recommended response protocols, and real-time updates as the situation evolves.",
    icon: (
      <svg
        className="w-10 h-10 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    stats: [
      { label: "Alert Delivery", value: "< 5 sec" },
      { label: "Response Rate", value: "99.9%" },
    ]
  },
  {
    number: "04",
    title: "Resolution & Analysis",
    description:
      "Emergency is resolved and the system collects data to improve future response efficiency.",
    detailedDescription: 
      "After each incident is resolved, our system compiles comprehensive analytics on response times, resource allocation, and outcome effectiveness. This data feeds back into our AI models, continuously improving detection accuracy and response recommendations for future emergencies.",
    icon: (
      <svg
        className="w-10 h-10 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { label: "Data Points", value: "250+" },
      { label: "Improvement Rate", value: "12% yearly" },
    ]
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-sm font-medium text-primary-700 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-3"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our streamlined process ensures rapid emergency detection and
            response, saving precious minutes when they matter most
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500/30 via-primary-500 to-primary-500/30 dark:from-primary-400/30 dark:via-primary-400 dark:to-primary-400/30 transform -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 * index }}
                  className={`flex flex-col ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  } items-center`}
                >
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div 
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 ${
                        activeStep === index ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
                      }`}
                      onClick={() => setActiveStep(activeStep === index ? null : index)}
                    >
                      <div className="absolute -top-5 -left-5 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                      <div className="mb-6 flex justify-between items-start">
                        <div className="text-primary-600 dark:text-primary-400">{step.icon}</div>
                        
                        {/* Expand/collapse button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStep(activeStep === index ? null : index);
                          }}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg 
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${activeStep === index ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {step.description}
                      </p>
                      
                      {/* Expanded content */}
                      {activeStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
                        >
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {step.detailedDescription}
                          </p>
                          
                          {/* Image */}
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {step.stats.map((stat, statIndex) => (
                              <div key={statIndex} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2"></div>

                  {/* Circle on timeline */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 border-4 border-white dark:border-gray-900 shadow-lg ${
                        activeStep === index ? 'animate-pulse' : ''
                      }`}
                    ></motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to see our system in action?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Request a Demo
            </a>
            <a
              href="#features"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
