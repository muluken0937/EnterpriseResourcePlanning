// financeController.js

const Invoice = require('../models/Invoice');

// 1. Get Overall Financial Summary
exports.getFinancialSummary = async (req, res) => {
  try {
    const totalRevenue = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    const outstandingPayments = await Invoice.aggregate([
      { $match: { status: 'unpaid' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.status(200).json({
      revenue: totalRevenue[0]?.total || 0,
      outstanding: outstandingPayments[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving financial summary', error });
  }
};

// 2. Get Revenue by Month/Quarter/Year
exports.getRevenueByPeriod = async (req, res) => {
  const { period } = req.query; // 'month', 'quarter', or 'year'
  try {
    const dateGroup = period === 'month' ? '$month' : period === 'quarter' ? '$quarter' : '$year';
    const revenueData = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: { [dateGroup]: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving revenue data', error });
  }
};

// 3. Get Overdue Invoices
exports.getOverdueInvoices = async (req, res) => {
  try {
    const overdueInvoices = await Invoice.find({ 
      dueDate: { $lt: new Date() }, 
      status: 'unpaid' 
    });
    res.status(200).json(overdueInvoices);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving overdue invoices', error });
  }
};
