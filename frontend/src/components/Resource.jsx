import React from 'react'

function Resource() {
    return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-blue-600 text-white py-6">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl font-bold">Resources</h1>
              <p className="text-lg mt-2">Explore our helpful resources to get started</p>
            </div>
          </header>
    
          <section className="py-12">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Resources</h2>
              <p className="text-lg text-gray-600 text-center mt-4">
                Discover guides, tutorials, and documentation to help you make the most out of our product and services.
              </p>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Resource 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Getting Started with ERP</h3>
                  <p className="text-gray-600 mt-4">
                    Learn the basics of implementing and using our ERP system with this step-by-step guide.
                  </p>
                  <a
                    href="/getting-started"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    Read Guide
                  </a>
                </div>
    
                {/* Resource 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Advanced Features</h3>
                  <p className="text-gray-600 mt-4">
                    Dive deeper into the advanced features of our ERP system and optimize your processes.
                  </p>
                  <a
                    href="/advanced-features"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    Explore Features
                  </a>
                </div>
    
                {/* Resource 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">FAQ</h3>
                  <p className="text-gray-600 mt-4">
                    Have questions? Check out our Frequently Asked Questions to find answers to common inquiries.
                  </p>
                  <a
                    href="/faq"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    View FAQ
                  </a>
                </div>
              </div>
            </div>
          </section>
    
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl font-semibold text-gray-800 text-center">Additional Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Resource 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Tutorial Videos</h3>
                  <p className="text-gray-600 mt-4">
                    Watch video tutorials to learn how to make the most of our ERP platform.
                  </p>
                  <a
                    href="/tutorial-videos"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    Watch Now
                  </a>
                </div>
    
                {/* Resource 5 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Customer Success Stories</h3>
                  <p className="text-gray-600 mt-4">
                    Read inspiring stories from businesses that have successfully implemented our ERP system.
                  </p>
                  <a
                    href="/success-stories"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    Read Stories
                  </a>
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

export default Resource