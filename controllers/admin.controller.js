const db = require('../config/db');

// ==========================
// DASHBOARD STATS
// ==========================
exports.getDashboardStats = (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS totalOrders,
      SUM(total_amount) AS totalRevenue
    FROM orders
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Stats error:', err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json(result[0]);
  });
};

// ==========================
// GET ALL ORDERS
// ==========================
exports.getAllOrders = (req, res) => {
  const query = `SELECT * FROM orders ORDER BY created_at DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Orders error:', err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.json(result);
  });
};

// ==========================
// MARK ORDER COMPLETED
// ==========================
exports.markCompleted = (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE orders
    SET status = 'Completed'
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'Order marked as completed' });
  });
};

// ==========================
// GET CONTACT MESSAGES
// ==========================
exports.getMessages = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
