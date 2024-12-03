import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi'; // Importing a search icon
import { FaUser } from 'react-icons/fa'; // User icon for visual enhancement
import '../CSS/SalesPerformance.css';

const SalesPerformance = () => {
  const [salesPerformance, setSalesPerformance] = useState([]);
  const [filteredSalesPerformance, setFilteredSalesPerformance] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('Not Paid');
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const customerListRef = useRef(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/sales-performance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalesPerformance(response.data);
        setFilteredSalesPerformance(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch sales performance. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, []);

  useEffect(() => {
    const filtered = salesPerformance.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSalesPerformance(filtered);
  }, [searchQuery, salesPerformance]);

  useEffect(() => {
    if (error === 'Failed to fetch customers for the selected user. Please try again.') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  const handleUserClick = async (userId) => {
    setSelectedCustomer(null);
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/users/customers/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data);
      setSelectedUser(userId);
      if (customerListRef.current) {
        customerListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      setError('Failed to fetch customers for the selected user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerClick = async (customer) => {
    setSelectedCustomer(customer);
    setError(null);
    setPaymentStatus('Not Paid');
    setTotalPayments(0);
    setTotalAmountSpent(0);
    setModalOpen(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/payments/customer/${customer._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.data.length > 0) {
        setPaymentStatus('Paid');
        setTotalPayments(response.data.totalPayments);
        setTotalAmountSpent(response.data.totalAmount);
      }
    } catch (err) {
      setError('Failed to fetch payment status. Please check your connection.');
    }
  };

  const handleVisitStatusChange = async (customer) => {
    if (!selectedCustomer) return;

    const updatedVisitStatus = selectedCustomer.visitStatus === 'Visited' ? 'Not Visited' : 'Visited';

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/users/customers/${customer._id}/visit-status`,
        { visitStatus: updatedVisitStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedCustomer((prevCustomer) => ({
        ...prevCustomer,
        visitStatus: updatedVisitStatus,
      }));

      setCustomers((prevCustomers) =>
        prevCustomers.map((cust) =>
          cust._id === customer._id ? { ...cust, visitStatus: updatedVisitStatus } : cust
        )
      );
    } catch (err) {
      setError('Failed to update visit status. Please try again.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="sales-container mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sales Performance</h2>

      {loading && <p className="text-center text-gray-500">Loading data, please wait...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search by username or email..."
            className="border rounded-lg pr-10 pl-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Representatives Section */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Sales Representatives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSalesPerformance.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className={`flex items-center p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 ${
                  selectedUser === user._id ? 'bg-blue-100' : ''
                }`}
              >
                <FaUser className="mr-3 text-blue-600" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{user.username}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm">Customers: {user.customerCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customers Section */}
        <div ref={customerListRef} className="bg-green-50 p-4 rounded-lg shadow">
          {selectedUser && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-green-600">Customers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <div
                      key={customer._id}
                      onClick={() => handleCustomerClick(customer)}
                      className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      <div className="flex flex-col">
                        <h4 className="font-medium text-lg">{customer.username}</h4>
                        <p className="text-sm text-gray-600">Email: {customer.email}</p>
                        <p className="text-sm text-gray-500">Status: {customer.visitStatus}</p>
                      </div>
                      <span className="mt-2 text-sm text-blue-500">View Details</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No customers found for this user.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for Customer Details */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <div className="space-y-2">
              <p><strong>Username:</strong> {selectedCustomer.username}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p>
              <p><strong>Description:</strong> {selectedCustomer.description}</p>
              <p><strong>Location:</strong> {selectedCustomer.location}</p>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={selectedCustomer.visitStatus === 'Visited'}
                onChange={() => handleVisitStatusChange(selectedCustomer)}
                className="mr-2"
              />
              <label>Visited</label>
            </div>

            <div className="mt-4 space-y-1">
              <p><strong>Payment Status:</strong> {paymentStatus}</p>
              <p><strong>Total Payments:</strong> {totalPayments}</p>
              <p><strong>Total Amount Spent:</strong> ${totalAmountSpent.toFixed(2)}</p>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPerformance;