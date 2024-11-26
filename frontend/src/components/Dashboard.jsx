

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/Dashboard.css';
// import FinanceDashboard from './FinanceDashboard'; // Import the new FinanceDashboard

// const Dashboard = () => {
//     const navigate = useNavigate();

//     const goToPerformance = () => {
//         navigate('/sales-performance');
//     };

//     const goToPropertyList = () => {
//         navigate('/properties');
//     };

//     return (
//         <div className="bg-gray-100">
//             {/* Hero Section */}
//             <section className="hero flex justify-center items-center">
//                 <div className="container mx-auto flex items-center flex-col lg:flex-row">
//                     <div className="hero-text lg:w-1/2">
//                         <h1>Say Yes to Next Level ERP</h1>
//                         <p>Because unlocking 'next' is where the magic happens.</p>
//                         <button onClick={goToPerformance}>Explore Our ERP</button>
//                     </div>
//                     <div className="hero-image lg:w-1/2"></div>
//                 </div>
//             </section>

//             {/* Experience Section */}
//             <section className="experience">
//                 <div className="experiencetext  flex justify-between ">
//                     <p>Experience  ERP - Take the virtual tour of  ERP capabilities.</p>
//                     <button onClick={goToPerformance}>performance</button>
//                 </div>
//             </section>

//             {/* Financial Dashboard Section (inserted after Experience Section) */}
//             <FinanceDashboard />
//             {/* ERP Info Section */}
//             <section className="erp-info">
//                 <div className="container mx-auto flex flex-col lg:flex-row items-center">
//                     <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
//                         <h2>ERP Business Software for Manufacturing and Distribution</h2>
//                         <p>Growth is a big part of your business game plan, but have you thought about how you should be managing and streamlining all critical business areas?</p>
//                         <button onClick={goToPropertyList}>View All Solutions</button>
//                     </div>
//                     <div className="erp-image lg:w-1/2"></div>
//                 </div>
//             </section>

//             {/* Industry Solutions Section */}
//             <section className="industry-solutions">
//                 <h3>al properties</h3>
//                 <p>Enterprise Resource Planning solutions, built to meet your industry needs.</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//                     {['Packaging', 'Electronics', 'Automotive', 'Industrial Machinery', 'Food & Beverage'].map((industry, index) => (
//                         <div key={index} className="industry-card">
//                             <h4>{industry}</h4>
//                             <p>ERP solutions tailored for {industry.toLowerCase()}.</p>
//                         </div>
//                     ))}
//                 </div>
//                 <button onClick={goToPerformance}>View All performance</button>
//             </section>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import '../CSS/Dashboard.css';
import FinanceDashboard from './FinanceDashboard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [activeIndex, setActiveIndex] = useState(1); // To track the active slide index

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/properties', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProperties(response.data);
            } catch (err) {
                setError('Failed to fetch properties.');
                console.error("Error fetching properties:", err.response || err.message);
            }
        };
        fetchProperties();
    }, []);

    const goToPerformance = () => {
        navigate('/sales-performance');
    };

    const goToPropertyList = () => {
        navigate('/properties');
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 2 seconds
        beforeChange: (current, next) => {
            setActiveIndex(next); // Update active index
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="hero flex justify-center items-center">
                <div className="container mx-auto flex items-center flex-col lg:flex-row">
                    <div className="hero-text lg:w-1/2">
                        <h1>Say Yes to Next Level ERP</h1>
                        <p>Because unlocking 'next' is where the magic happens.</p>
                        <button onClick={goToPerformance}>Explore Our ERP</button>
                    </div>
                    <div className="hero-image lg:w-1/2"></div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="experience">
                <div className="experiencetext flex justify-between">
                    <p>Experience ERP - Take the virtual tour of ERP capabilities.</p>
                    <button onClick={goToPerformance}>Performance</button>
                </div>
            </section>

            {/* Financial Dashboard Section */}
            <FinanceDashboard />

            {/* Property Slideshow Section */}
            <section className="property-slideshow-section">
                <h3 className="text-center text-2xl font-semibold mb-6">Our Properties</h3>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="property-slideshow-container">
                    <Slider {...sliderSettings}>
                        {properties.map((property, index) => {
                            let slideClass = '';
                            if (index === activeIndex) {
                                slideClass = 'middle'; // Make active slide larger
                            } else if (index === activeIndex - 1 || (activeIndex === 0 && index === properties.length - 1)) {
                                slideClass = 'left'; // Position left slide lower
                            } else if (index === activeIndex + 1 || (activeIndex === properties.length - 1 && index === 0)) {
                                slideClass = 'right'; // Position right slide lower
                            }

                            return (
                                <div key={property._id} className={`property-slide p-4 ${slideClass}`}>
                                    <div className="property-card rounded-lg shadow-lg overflow-hidden">
                                        {property.images?.[0]?.imageUrl ? (
                                            <img
                                                src={`http://localhost:5000${property.images[0].imageUrl}`}
                                                alt={property.title}
                                                className="property-image w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="property-image-placeholder w-full h-48 bg-gray-300 flex items-center justify-center text-gray-700">
                                                No Image
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold">{property.title}</h4>
                                            <p className="text-sm text-gray-600">Price: ${property.price || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </section>

            {/* ERP Info Section */}
            <section className="erp-info">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                        <h2>ERP Business Software for Manufacturing and Distribution</h2>
                        <p>Growth is a big part of your business game plan, but have you thought about how you should be managing and streamlining all critical business areas?</p>
                        <button onClick={goToPropertyList}>View All Solutions</button>
                    </div>
                    <div className="erp-image lg:w-1/2"></div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
