import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/InvoicePaymentList.css';

const InvoicePaymentList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch all invoices on component mount
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!token) {
        console.error('No token provided');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/invoices', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        });
        setInvoices(response.data.data);
      } catch (error) {
        console.error('Error fetching invoices:', error.response?.data?.error || error.message);
      }
    };

    fetchInvoices();
  }, [token]);

  const handleInvoiceSelect = (invoice) => {
    navigate(`/payments/${invoice._id}`);
  };

  const toggleInvoiceDetails = (invoiceId) => {
    setSelectedInvoiceId(selectedInvoiceId === invoiceId ? null : invoiceId);
  };

  const handleDelete = async (invoiceId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        alert('Invoice deleted successfully');
        setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
      }
    } catch (error) {
      console.error('Error deleting invoice:', error.response?.data?.error || error.message);
    }
  };

  const handleUpdate = (invoiceId) => {
    navigate(`/invoices/edit/${invoiceId}`);
  };

  return (
    <div className="invoice-payment-list">
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            <div className="invoice-header">
              <span>Customer: {invoice.customer ? invoice.customer.username : 'Unknown'}</span>
              <span>Total: ${invoice.total}</span>
              <span>Status: {invoice.status}</span>

              {invoice.customer && (
                <button onClick={() => handleInvoiceSelect(invoice)}>Make Payment</button>
              )}

              <button onClick={() => toggleInvoiceDetails(invoice._id)}>
                {selectedInvoiceId === invoice._id ? 'Hide Details' : 'Show Details'}
              </button>

              {/* Show Update and Delete buttons for all users */}
              <button onClick={() => handleUpdate(invoice._id)} className="update-button">
                Update
              </button>
              <button onClick={() => handleDelete(invoice._id)} className="delete-button">
                Delete
              </button>
            </div>

            {selectedInvoiceId === invoice._id && (
              <div className="invoice-details">
                <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <h3>Line Items</h3>
                <ul>
                  {invoice.lineItems.map((item) => (
                    <li key={item._id}>
                      <strong>{item.description}</strong>: {item.quantity} x ${item.unitPrice} = ${item.total}
                    </li>
                  ))}
                </ul>
                <h3>Total: ${invoice.total}</h3>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoicePaymentList;

