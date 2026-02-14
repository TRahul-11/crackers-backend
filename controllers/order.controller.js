const db = require('../config/db');

exports.createOrder = (req, res) => {
  try {
    const { customer, cartItems, totalAmount } = req.body;

    // 🔐 VALIDATION (prevents 500 error)
    if (
      !customer ||
      !customer.firstName ||
      !customer.phone ||
      !customer.address ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return res.status(400).json({
        message: 'Invalid order data',
        received: req.body
      });
    }

    const orderNumber = 'ORD' + Date.now();

    const orderQuery = `
      INSERT INTO orders
      (order_number, customer_name, phone, email, address, city, state, pincode, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      orderQuery,
      [
        orderNumber,
        customer.firstName,
        customer.phone,
        customer.email || '',
        customer.address,
        customer.city || '',
        customer.state || '',
        customer.pincode || '',
        totalAmount
      ],
      (err, result) => {
        if (err) {
          console.error('Order insert error:', err);
          return res.status(500).json(err);
        }

        const orderId = result.insertId;

        const itemQuery = `
          INSERT INTO order_items
          (order_id, product_id, product_name, price, quantity, subtotal)
          VALUES ?
        `;

        const values = cartItems.map(i => [
          orderId,
          i.id,
          i.name,
          i.price,
          i.qty,
          i.qty * i.price
        ]);

        db.query(itemQuery, [values], (err2) => {
          if (err2) {
            console.error('Order items error:', err2);
            return res.status(500).json(err2);
          }

          res.status(201).json({
            message: 'Order placed successfully',
            orderNumber
          });
        });
      }
    );
  } catch (err) {
    console.error('Create order crash:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
