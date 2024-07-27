const User = require('../Models/User');
const Transaction = require('../Models/transaction')

exports.userCount = async (req , res) =>{
    try {
        const count = await User.countDocuments({ isAdmin: false });
        res.status(200).json(count);
      } catch (error) {
        res.status(500).json({ message: 'Error getting user count' });
      }
};

exports.transactionCount = async(req , res)=>{
    try {
        const count = await Transaction.countDocuments();
        res.status(200).json(count);
      } catch (error) {
        res.status(500).json({ message: 'Error getting transaction count' });
      }
};

exports.totalRevenue = async (req , res)=> {
    try {
        const totalRevenue = await Transaction.aggregate([
          { $group: { _id: null, total: { $sum: "$price" } } }
        ]);
        res.status(200).json( totalRevenue[0]?.total || 0 );
      } catch (error) {
        res.status(500).json({ message: 'Error getting total revenue' });
      }
}

exports.averageMonthlyRevenue = async (req , res) => {
    try {
        const averageMonthlyRevenue = await Transaction.aggregate([
          {
            $group: {
              _id: { month: { $month: "$dateStart" }, year: { $year: "$dateStart" } },
              monthlyTotal: { $sum: "$price" }
            }
          },
          {
            $group: {
              _id: null,
              average: { $avg: "$monthlyTotal" }
            }
          }
        ]);
        res.status(200).json(averageMonthlyRevenue[0]?.average || 0 );
      } catch (error) {
        res.status(500).json({ message: 'Error getting average monthly revenue' });
      }
}