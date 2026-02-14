const db = require('../config/db');

exports.sendMessage = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message
  } = req.body;

  const query = `
    INSERT INTO contact_messages
    (first_name, last_name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [firstName, lastName, email, phone, subject, message],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Message saved' });
    }
  );
};

exports.getAllMessages = (req, res) => {
  db.query(
    'SELECT * FROM contact_messages ORDER BY created_at DESC',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
