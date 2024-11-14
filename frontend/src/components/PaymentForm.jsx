import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import '../CSS/PaymentForm.css';

const PaymentForm = () => {
  const { invoiceId } = useParams(); // Get the invoiceId from the URL
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Automatically set customerId from local storage if it exists
    const storedCustomerId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    
    if (role === 'Customer') {
      setCustomerId(storedCustomerId);
    } else {
      setMessage('Only customers are allowed to make payments.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if customerId is set and role is 'customer'
    if (!customerId) {
      setMessage('Customer ID is required to make a payment.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payments', {
        invoice: invoiceId,  // Pass the invoiceId from the URL
        amount,
        paymentMethod,
        customerId,
      });
      setMessage('Payment successful!');
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4>Payment for Invoice ID: {invoiceId}</h4>
      {message && (
        <p className={message === 'Payment successful!' ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <label>Payment Method</label>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
        <option value="">Select Method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>
      {customerId && (
        <div>
          <label>Customer ID</label>
          <input type="text" value={customerId} disabled />
        </div>
      )}
      <button type="submit" disabled={!customerId || !amount || !paymentMethod}>
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;
