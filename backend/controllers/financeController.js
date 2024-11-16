const Invoice = require('../models/Invoice');

// 1. Get Overall Financial Summary
// Updated getFinancialSummary function in financeController.js
exports.getFinancialSummary = async (req, res) => {
  try {
    const totalRevenueResult = await Invoice.aggregate([
      { $match: { status: 'Paid' } },  // Match invoices that are marked as 'Paid'
      { $group: { _id: null, total: { $sum: "$total" } } }  // Sum the 'total' field
    ]);

    const outstandingPaymentsResult = await Invoice.aggregate([
      { $match: { status: { $in: ['Pending', 'Overdue'] } } },  // Match unpaid invoices
      { $group: { _id: null, total: { $sum: "$total" } } }  // Sum the 'total' field
    ]);

    // Extract total values from aggregation results, or default to 0 if no results
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const outstandingPayments = outstandingPaymentsResult[0]?.total || 0;

    res.status(200).json({
      revenue: totalRevenue,
      outstanding: outstandingPayments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving financial summary', error });
  }
};

 
// 2. Get Revenue by Month/Quarter/Year
exports.getRevenueByPeriod = async (req, res) => {
  const { period } = req.query;
  
  if (!['month', 'quarter', 'year'].includes(period)) {
    return res.status(400).json({ message: 'Invalid period specified. Use "month", "quarter", or "year".' });
  }

  try {
    const dateGroup = period === 'month' ? { $month: "$invoiceDate" } 
                      : period === 'quarter' ? { $quarter: "$invoiceDate" } 
                      : { $year: "$invoiceDate" };

    const revenueData = await Invoice.aggregate([
      { $match: { status: 'Paid' } },                   // Adjusted status to match 'Paid'
      {
        $group: {
          _id: dateGroup,
          total: { $sum: "$total" }                     // Changed "amount" to "total"
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json(revenueData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving revenue data', error });
  }
};

// 3. Get Overdue Invoices
exports.getOverdueInvoices = async (req, res) => {
  try {
    const overdueInvoices = await Invoice.find({ 
      dueDate: { $lt: new Date() }, 
      status: 'Pending'                                // Changed "unpaid" to "Pending" to match schema
    });
    res.status(200).json(overdueInvoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving overdue invoices', error });
  }
};
