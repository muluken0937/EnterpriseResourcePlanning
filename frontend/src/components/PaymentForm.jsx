import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/PaymentForm.css';

const PaymentForm = () => {
  const { invoiceId } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate(); 
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total'); 

  const [amount, setAmount] = useState(totalAmount || ''); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (role === 'Customer') {
      setCustomerId(storedCustomerId);
    } else {
      setMessage('Only customers are allowed to make payments.');
    }
  }, []);

  const validateForm = () => {
    if (!amount || !paymentMethod) {
      setError('All fields are required!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!validateForm() || !customerId) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/payments', {
        invoice: invoiceId, 
        amount,
        paymentMethod,
        customerId,
      });

      setMessage('Payment successful!');

      const userConfirmed = window.confirm('Payment successful! Click OK to go back to the invoice list.');
      if (userConfirmed) {
        navigate('/InvoicePaymentList?status=success'); 
      }
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-form-container">
      <h4 className="payment-header">Payment for Invoice ID: {invoiceId}</h4>
      {message && (
        <p className={message === 'Payment successful!' ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select 
            id="paymentMethod" 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
            required
          >
            <option value="">Select Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        {customerId && (
          <div className="form-group">
            <label htmlFor="customerId">Customer ID</label>
            <input id="customerId" type="text" value={customerId} disabled />
          </div>
        )}
        <button type="submit" className="submit-button" disabled={!customerId || !amount || !paymentMethod}>
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;