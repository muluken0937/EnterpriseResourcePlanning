import React, { useState, useEffect } from 'react';

function Resource() {
    const [selectedPage, setSelectedPage] = useState(null);
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

    const backgroundImages = [
        '/R.jpg',
        '/OIP (3).jpg',
        '/download (5).jpg',
        '/th.jpg',
        '/OIP (1).jpg'
    ];

    const headerImage = '/Real-Estate-Marketing-1024x576.jpg';

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const showGuidePage = () => setSelectedPage('guide');
    const showFeaturesPage = () => setSelectedPage('features');
    const showFAQPage = () => setSelectedPage('faq');
    const closeDetail = () => setSelectedPage(null);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
                transition: 'background-image 1s ease-in-out',
            }}
        >
            <header className="relative bg-blue-100 text-white py-6">
                <img
                    src={headerImage}
                    alt="Real Estate Marketing"
                    className="w-full h-64 object-cover"
                />
                <div className="container mx-auto text-center mt-4">
                    <h1 className="text-3xl font-bold">Resources</h1>
                    <p className="text-lg mt-2">Explore our helpful resources to get started</p>
                </div>
            </header>

            {/* Main Resource Links */}
            {!selectedPage && (
                <section className="py-12 bg-white bg-opacity-80">
                    <div className="container mx-auto px-6 md:px-12">
                        <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Resources</h2>
                        <p className="text-lg text-gray-600 text-center mt-4">
                            Discover guides, tutorials, and documentation to help you make the most out of our product and services.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold text-gray-800">Getting Started with ERP</h3>
                                <p className="text-gray-600 mt-4">
                                    Learn the basics of implementing and using our ERP system with this step-by-step guide.
                                </p>
                                <button onClick={showGuidePage} className="text-blue-600 hover:underline mt-4 block">
                                    Read Guide
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold text-gray-800">Advanced Features</h3>
                                <p className="text-gray-600 mt-4">
                                    Dive deeper into the advanced features of our ERP system and optimize your processes.
                                </p>
                                <button onClick={showFeaturesPage} className="text-blue-600 hover:underline mt-4 block">
                                    Explore Features
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold text-gray-800">FAQ</h3>
                                <p className="text-gray-600 mt-4">
                                    Have questions? Check out our Frequently Asked Questions to find answers to common inquiries.
                                </p>
                                <button onClick={showFAQPage} className="text-blue-600 hover:underline mt-4 block">
                                    View FAQ
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Detail Sections */}
            {selectedPage && (
                <div className="absolute inset-0 bg-white p-8 overflow-y-auto z-10">
                    <button onClick={closeDetail} className="text-blue-600 hover:underline mb-4">
                        &larr; Back
                    </button>
                    {selectedPage === 'guide' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Getting Started with ERP</h1>
                            <p className="text-lg leading-relaxed mb-6">
                                Welcome to the ERP Getting Started Guide! This guide provides step-by-step instructions to help you configure and start using your ERP system. Topics include:
                            </p>
                            <ul className="list-disc ml-5 mb-6">
                                <li>System setup and configuration</li>
                                <li>Creating and managing user accounts</li>
                                <li>Importing and exporting data</li>
                            </ul>
                            <p className="text-lg leading-relaxed">
                                Each section offers insights to help you tailor the ERP system to your needs, covering setup tips, best practices, and more.
                            </p>
                        </div>
                    )}
                    {selectedPage === 'features' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Advanced Features</h1>
                            <p className="text-lg leading-relaxed mb-6">
                                Discover the advanced features of our ERP system to streamline your processes. Topics include:
                            </p>
                            <ul className="list-disc ml-5 mb-6">
                                <li>Automated workflows and triggers</li>
                                <li>Advanced reporting and analytics</li>
                                <li>Integration with third-party applications</li>
                            </ul>
                            <p className="text-lg leading-relaxed">
                                By exploring these features, you can unlock more efficient workflows and data-driven insights.
                            </p>
                        </div>
                    )}
                    {selectedPage === 'faq' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions (FAQ)</h1>
                            <p className="text-lg leading-relaxed mb-6">
                                This FAQ section addresses common questions and concerns about using our ERP system:
                            </p>
                            <ul className="list-disc ml-5 mb-6">
                                <li>Account setup and login troubleshooting</li>
                                <li>Billing and payment options</li>
                                <li>Technical support and resources</li>
                            </ul>
                            <p className="text-lg leading-relaxed">
                                For further assistance, please reach out to our support team.
                            </p>
                        </div>
                    )}
                </div>
            )}
          {/* Additional Resources Section */}
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
                                href="https://www.youtube.com/results?search_query=erp+tutorial+for+beginners"
                                target="_blank"
                                rel="noopener noreferrer"
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

            {/* Footer */}
            <footer className="bg-blue-400 text-white py-6">
                <div className="container mx-auto text-center">
                    <p className="text-lg space-x-10">facebook     LinkedIn      instagram         youtube</p>
                </div>
            </footer>
        </div>
    );
}

export default Resource;