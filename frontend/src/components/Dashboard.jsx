

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';
import FinanceDashboard from './FinanceDashboard'; // Import the new FinanceDashboard

const Dashboard = () => {
    const navigate = useNavigate();

    const goToPerformance = () => {
        navigate('/sales-performance');
    };

    const goToPropertyList = () => {
        navigate('/properties');
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
                <div className="container mx-auto flex justify-between items-center">
                    <p>Experience  ERP - Take the virtual tour of  ERP capabilities.</p>
                    <button onClick={goToPerformance}>performance</button>
                </div>
            </section>

            {/* Financial Dashboard Section (inserted after Experience Section) */}
            <FinanceDashboard /> {/* Add the Financial Dashboard here */}

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

            {/* Industry Solutions Section */}
            <section className="industry-solutions">
                <h3>al properties</h3>
                <p>Enterprise Resource Planning solutions, built to meet your industry needs.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {['Packaging', 'Electronics', 'Automotive', 'Industrial Machinery', 'Food & Beverage'].map((industry, index) => (
                        <div key={index} className="industry-card">
                            <h4>{industry}</h4>
                            <p>ERP solutions tailored for {industry.toLowerCase()}.</p>
                        </div>
                    ))}
                </div>
                <button onClick={goToPerformance}>View All performance</button>
            </section>
        </div>
    );
};

export default Dashboard;
