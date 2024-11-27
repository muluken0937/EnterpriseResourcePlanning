
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const User = require('../models/user');  

exports.recordPayment = async (req, res) => {
  try {
    const { invoice, amount, paymentMethod, customerId } = req.body;  
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(400).json({ success: false, error: 'Customer not found' });
    }

    const payment = await Payment.create({
      invoice,
      amount,
      paymentMethod,
      customerId,
    });

    const invoiceToUpdate = await Invoice.findById(invoice);
    if (invoiceToUpdate) {
      if (!invoiceToUpdate.customer && customerId) {
        invoiceToUpdate.customer = customerId;
        await invoiceToUpdate.save();
      }

      const totalPaidData = await Payment.aggregate([
        { $match: { invoice: invoiceToUpdate._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      const totalPaid = (totalPaidData[0] && totalPaidData[0].total) || 0;

      if (totalPaid >= invoiceToUpdate.total) {
        invoiceToUpdate.status = 'Paid';
        await invoiceToUpdate.save();
      }
    }

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('invoice')
      .populate('customerId', 'name email');  

    if (!payment) return res.status(404).json({ success: false, error: 'Payment not found' });

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('invoice')
      .populate('customerId', 'name email');  

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
