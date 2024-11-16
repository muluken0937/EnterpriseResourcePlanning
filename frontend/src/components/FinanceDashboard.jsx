import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinanceDashboard = () => {
  const [summary, setSummary] = useState({ revenue: 0, outstanding: 0 });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token
    const token = localStorage.getItem('token'); // Updated token key to match login storage

    if (!token) {
      console.error("No authentication token found. Redirecting to login.");
      navigate('/login'); // Redirect to login if token is missing
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch Financial Summary
    axios.get('http://localhost:5000/api/reports/summary', config)
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching financial summary:", error));

    // Fetch Monthly Revenue
    axios.get('http://localhost:5000/api/reports/revenue?period=month', config)
      .then(response => setMonthlyRevenue(response.data))
      .catch(error => console.error("Error fetching monthly revenue:", error));

    // Fetch Overdue Invoices
    axios.get('http://localhost:5000/api/reports/overdue', config)
      .then(response => setOverdueInvoices(response.data))
      .catch(error => console.error("Error fetching overdue invoices:", error));
  }, [navigate]);

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="finance-dashboard container mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Financial Dashboard</h1>

      {/* Financial Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Revenue</h2>
          <p className="text-lg">${summary.revenue.toFixed(2)}</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Outstanding Payments</h2>
          <p className="text-lg">${summary.outstanding.toFixed(2)}</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Overdue Invoices</h2>
          <p className="text-lg">{overdueInvoices.length} Invoices</p>
        </div>
      </div>

      {/* Revenue by Month (Line Chart) */}
      <h2 className="text-xl font-medium mb-4">Revenue by Month</h2>
      <ResponsiveContainer width="100%" height={300} className="recharts-wrapper">
        <LineChart data={monthlyRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Outstanding Payments (Pie Chart) */}
      <h2 className="text-xl font-medium mt-8 mb-4">Payments Overview</h2>
      <ResponsiveContainer width="100%" height={300} className="recharts-wrapper">
        <PieChart>
          <Pie
            data={[
              { name: 'Paid', value: summary.revenue },
              { name: 'Outstanding', value: summary.outstanding },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
            dataKey="value"
          >
            <Cell fill={COLORS[0]} />
            <Cell fill={COLORS[1]} />
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceDashboard;
