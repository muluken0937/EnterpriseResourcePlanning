import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const goToPerformance = () => {
        navigate('/sales-performance');
    };

    return (
        <div className="dashboard-container ">
            
            <div className="background-section">
                <div className="background-overlay">
                    <div className="background-text">
                        <h1 className='dashboard-h1 '>Welcome to the Dashboard!</h1>
                        choice our the first one 
                        </div>
                </div>
            </div>
    
            <div onClick={goToPerformance} className="dashboard-card">
                <h2>Registration Performance</h2>
                <p className='dash-p'>Click to view Sales User performance</p>
            </div>
        </div>
    );
};

export default Dashboard;
