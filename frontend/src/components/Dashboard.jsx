import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const goToPerformance = () => {
        navigate('/sales-performance');
    };

    const goToPropertyList = () => {
        navigate('/properties'); // Navigate to PropertyList
    };

    return (
        <div className="dashboard-container">
            <div className="background-section">
                <div className="background-overlay">
                    <div className="background-text">
                        <h1 className='dashboard-h1'>Welcome to the Dashboard!</h1>
                        Choose an option below:
                    </div>
                </div>
            </div>

            <div onClick={goToPerformance} className="dashboard-card">
                <h2>Registration Performance</h2>
                <p className='dash-p'>Click to view Sales User performance</p>
            </div>

            <div onClick={goToPropertyList} className="dashboard-card">
                <h2>Property List</h2>
                <p className='dash-p'>Click to view all properties</p>
            </div>
        </div>
    );
};

export default Dashboard;
