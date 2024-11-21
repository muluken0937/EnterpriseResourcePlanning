const Invoice = require('../models/Invoice');
const Property = require('../models/property'); // Import Property model

exports.createInvoice = async (req, res) => {
  try {
    const { dueDate, lineItems, subtotal, tax, total, propertyId } = req.body;

    if (!dueDate || !lineItems || !lineItems.length) {
      return res.status(400).json({ success: false, message: 'Invalid data: Missing fields' });
    }

    // Fetch property details
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Update line items with property price
    const updatedLineItems = lineItems.map(item => ({
      ...item,
      unitPrice: property.price,
      total: item.quantity * property.price,
    }));

    // Calculate subtotal, tax, and total
    const updatedSubtotal = updatedLineItems.reduce((acc, item) => acc + item.total, 0);
    const updatedTax = updatedSubtotal * 0.1; // Assuming 10% tax
    const updatedTotal = updatedSubtotal + updatedTax;

    // Create the invoice
    const invoice = await Invoice.create({
      dueDate,
      lineItems: updatedLineItems,
      subtotal: updatedSubtotal,
      tax: updatedTax,
      total: updatedTotal,
      createdBy: req.user.id,
      property: propertyId,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ success: false, error: 'Server error while creating invoice' });
  }
};




// Get Invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id) 
      .populate('createdBy', 'name email')
      .populate('property', 'price name location');

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ success: false, error: 'Server error' });
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