const Invoice = require('../models/Invoice');

// Create Invoice
exports.createInvoice = async (req, res) => {
  try {
    const { dueDate, lineItems, subtotal, tax, total, createdBy } = req.body;

    const invoice = await Invoice.create({
      dueDate,
      lineItems,  
      subtotal,
      tax,
      total,
      createdBy,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get Invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('createdBy');

    if (!invoice) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!invoice) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('createdBy');

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Delete Invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};