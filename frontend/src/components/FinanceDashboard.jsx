import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const FinanceDashboard = () => {
  const [summary, setSummary] = useState({ revenue: 0, outstanding: 0 });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/summary')
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching financial summary:", error));

    axios.get('http://localhost:5000/api/reports/revenue?period=month')
      .then(response => setMonthlyRevenue(response.data))
      .catch(error => console.error("Error fetching monthly revenue:", error));

    axios.get('http://localhost:5000/api/reports/overdue')
      .then(response => setOverdueInvoices(response.data))
      .catch(error => console.error("Error fetching overdue invoices:", error));
  }, []);

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="finance-dashboard container mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Financial Dashboard</h1>

      {/* Financial Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Revenue</h2>
          <p className="text-lg">${summary.revenue}</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Outstanding Payments</h2>
          <p className="text-lg">${summary.outstanding}</p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Overdue Invoices</h2>
          <p className="text-lg">{overdueInvoices.length} Invoices</p>
        </div>
      </div>

      {/* Revenue by Month (Line Chart) */}
      <h2 className="text-xl font-medium mb-4">Revenue by Month</h2>
      <ResponsiveContainer width="100%" height={300} className="recharts-wrapper">
        <LineChart data={monthlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
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
            label
          >
            {summary.outstanding > 0 && <Cell fill={COLORS[0]} />}
            {summary.revenue > 0 && <Cell fill={COLORS[1]} />}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceDashboard;
