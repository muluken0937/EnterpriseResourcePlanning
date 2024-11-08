import React from 'react'

function About() {
    return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-blue-600 text-white py-6">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl font-bold">About Us</h1>
              <p className="text-lg mt-2">Learn more about our company and mission</p>
            </div>
          </header>
    
          <section className="py-12">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
                  <p className="mt-4 text-lg text-gray-600">
                    We are committed to providing innovative solutions to businesses, helping them manage their operations and grow efficiently. Our mission is to create a seamless experience with advanced tools that can automate and streamline business processes.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Our vision is to be a global leader in ERP systems, empowering businesses to maximize their potential with cutting-edge technology. We strive to build solutions that cater to businesses of all sizes and industries.
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl font-bold text-center text-gray-800">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="Team Member 1" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h3>
                  <p className="mt-2 text-gray-600">CEO & Founder</p>
                </div>
                <div className="text-center">
                  <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="Team Member 2" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h3>
                  <p className="mt-2 text-gray-600">CTO</p>
                </div>
                <div className="text-center">
                  <img className="w-24 h-24 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="Team Member 3" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">Bob Johnson</h3>
                  <p className="mt-2 text-gray-600">Head of Marketing</p>
                </div>
              </div>
            </div>
          </section>
    
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
              <p className="text-lg">© ERP 2024. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      );
    }


export default About