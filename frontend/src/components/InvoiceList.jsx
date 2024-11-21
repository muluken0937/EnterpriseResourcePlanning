import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../CSS/InvoiceList.css';

const InvoiceList = () => {
  const { state } = useLocation(); 
  const { propertyId, price } = state || {}; 
  const [invoiceData, setInvoiceData] = useState({
    dueDate: '',
    lineItems: price
      ? [{ description: 'Default Item', quantity: 1, unitPrice: price }]
      : [{ description: '', quantity: 1, unitPrice: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const [error, setError] = useState(null);

  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const subtotal = invoiceData.lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;
    setInvoiceData((prevData) => ({ ...prevData, subtotal, tax, total }));
  };

  // Fetch existing invoice if invoiceId is provided (edit mode)
  useEffect(() => {
    if (invoiceId) {
      const fetchInvoiceData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('User not authenticated');
            return;
          }

          const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            setInvoiceData(response.data.data);
          } else {
            setError('Invoice not found.');
          }
        } catch (error) {
          setError('Error fetching invoice data.');
        }
      };

      fetchInvoiceData();
    }
  }, [invoiceId]);

  // Recalculate totals when line items change
  useEffect(() => {
    calculateTotal();
  }, [invoiceData.lineItems]);

  // Handle line item changes
  const handleLineItemChange = (index, event) => {
    const updatedItems = invoiceData.lineItems.map((item, i) =>
      i === index ? { ...item, [event.target.name]: event.target.value } : item
    );
    setInvoiceData((prevData) => ({ ...prevData, lineItems: updatedItems }));
  };

  // Add new line item
  const addLineItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      lineItems: [...prevData.lineItems, { description: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('You are not authenticated. Please log in again.');
      navigate('/login');
      return;
    }

    const invoiceDataWithUser = { ...invoiceData, createdBy: userId, propertyId };

    try {
      let response;
      if (invoiceId) {
        // Update existing invoice
        response = await axios.put(
          `http://localhost:5000/api/invoices/${invoiceId}`,
          invoiceDataWithUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new invoice
        response = await axios.post(
          'http://localhost:5000/api/invoices',
          invoiceDataWithUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        alert(invoiceId ? 'Invoice updated successfully' : 'Invoice created successfully');
        navigate('/InvoicePaymentList'); // Redirect after successful save
      }
    } catch (error) {
      alert('Error saving invoice. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>{invoiceId ? 'Update Invoice' : 'Create Invoice'}</h2>

      {error && <p className="error-message">{error}</p>}

      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={invoiceData.dueDate}
          onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
          required
        />
      </label>

      {invoiceData.lineItems.map((item, index) => (
        <div key={index} className="line-item">
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => handleLineItemChange(index, e)}
              required
            />
          </label>

          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleLineItemChange(index, e)}
              required
              min="1"
            />
          </label>

          <label>
            Unit Price:
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleLineItemChange(index, e)}
              required
              min="0"
            />
          </label>

          <div>Total: {item.quantity * item.unitPrice}</div>
        </div>
      ))}

      <button type="button" onClick={addLineItem}>
        Add Item
      </button>

      <div>Subtotal: {invoiceData.subtotal}</div>
      <div>Tax (10%): {invoiceData.tax}</div>
      <div>Total: {invoiceData.total}</div>

      <button type="submit">{invoiceId ? 'Update Invoice' : 'Create Invoice'}</button>
    </form>
  );
};

export default InvoiceList;

