// Invoice model (models/Invoice.js)
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  lineItems: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      total: Number,
    },
  ],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
