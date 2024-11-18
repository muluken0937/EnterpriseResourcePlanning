

// InvoiceDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm';
import { useNavigate } from 'react-router-dom';
import '../CSS/InvoiceDetails.css';

const InvoiceDetails = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceId}`);
        if (response.data.success) {
          setInvoice(response.data.data);
        } else {
          setError('Invoice not found');
        }
      } catch (error) {
        setError('Error fetching invoice data');
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  // Loading state or error state handling
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!invoice) {
    return <div className="loading">Loading invoice details...</div>;
  }

  return (
    <div className="invoice-details">
      <h2>Invoice #{invoice._id}</h2>
      <p><strong>Created By:</strong> {invoice.createdBy?.username || 'Unknown'}</p>
      <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
      <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {invoice.status}</p>

      <h3>Line Items</h3>
      <ul>
        {invoice.lineItems.map((item, index) => (
          <li key={index}>
            <strong>Description:</strong> {item.description}<br />
            <strong>Quantity:</strong> {item.quantity}<br />
            <strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}<br />
            <strong>Item Total:</strong> ${(item.quantity * item.unitPrice).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Invoice Summary</h3>
      <p><strong>Subtotal:</strong> ${invoice.subtotal.toFixed(2)}</p>
      <p><strong>Tax:</strong> ${invoice.tax.toFixed(2)}</p>
      <p><strong>Total:</strong> ${invoice.total.toFixed(2)}</p>

      <PaymentForm invoiceId={invoice._id} />
    </div>
  );
};

export default InvoiceDetails;
