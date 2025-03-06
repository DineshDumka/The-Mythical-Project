// src/components/Testimonials.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fire Department Chief",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote:
      "The AI detection system has cut our response time by 40%. We are now able to reach emergencies faster and save more lives.",
  },
  {
    name: "Michael Chen",
    role: "City Resident",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "I reported a gas leak through the app and emergency services arrived within minutes. This system is truly revolutionary.",
  },
  {
    name: "Dr. Amelia Rodriguez",
    role: "Emergency Medical Director",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The precise location data and incident details we receive have dramatically improved our ability to prepare for emergencies before arrival.",
  },
  {
    name: "Robert Williams",
    role: "Police Captain",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "The data analytics have helped us optimize patrol routes and resource allocation, making our entire department more efficient.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Hear from emergency responders and citizens who have experienced the
            difference
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop view - Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <FaQuoteLeft className="text-primary-200 dark:text-primary-800 text-4xl absolute -top-2 -left-2 opacity-30" />
                  <p className="text-gray-600 dark:text-gray-300 pl-6">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile view - Carousel */}
          <div className="md:hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <div className="relative">
                <FaQuoteLeft className="text-primary-200 dark:text-primary-800 text-4xl absolute -top-2 -left-2 opacity-30" />
                <p className="text-gray-600 dark:text-gray-300 pl-6">
                  {testimonials[currentIndex].quote}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="text-primary-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="text-primary-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;