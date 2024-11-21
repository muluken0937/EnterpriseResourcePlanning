import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'; // Import icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    // Handle form submission logic here, like sending the data to a server
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg mt-2">We'd love to hear from you!</p>
        </div>
      </header>

      {/* Contact Form */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Get In Touch
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Information and Map */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Location</h2>
              <div className="space-y-4">
                {/* Company Address */}
                <p className="text-gray-600">
                  <strong>Address:</strong> Ethiopia, Addis Ababa, Lebu Mebrat
                </p>

                {/* Phone */}
                <p className="text-gray-600">
                  <strong>Phone:</strong> +252 09988776
                </p>

                {/* Email */}
                <p className="text-gray-600">
                  <strong>Email:</strong> support@erpcompany.com
                </p>

                {/* Google Map Embed */}
                <div className="mt-6">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.369066764402!2d39.7731043!3d9.036401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163b7737f6b5e0a1%3A0x8e1b7e6a5ed9b6d4!2s2QG9%2B5HG%2C%20Addis%20Ababa!5e0!3m2!1sen!2s!4v1635470195733"
                    width="100%"
                    height="300"
                    style={{ border: "0" }}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" aria-label="LinkedIn" className="text-gray-800 hover:text-blue-600">
              <FaLinkedin className="h-8 w-8" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-800 hover:text-blue-600">
              <FaTwitter className="h-8 w-8" />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-800 hover:text-blue-600">
              <FaFacebook className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
