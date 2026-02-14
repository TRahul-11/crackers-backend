const db = require('./config/db');

const createTables = () => {

  // 1️⃣ Orders Table
  const ordersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_number VARCHAR(50) UNIQUE,
      customer_name VARCHAR(100),
      phone VARCHAR(20),
      email VARCHAR(100),
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      pincode VARCHAR(20),
      total_amount DECIMAL(10,2),
      status VARCHAR(20) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // 2️⃣ Order Items Table
  const orderItemsTable = `
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      product_name VARCHAR(255),
      price DECIMAL(10,2),
      quantity INT,
      subtotal DECIMAL(10,2),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `;

  // 3️⃣ Contact Messages Table
  const contactTable = `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100),
      phone VARCHAR(20),
      subject VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(ordersTable);
  db.query(orderItemsTable);
  db.query(contactTable);

  console.log("Tables checked/created successfully");
};

module.exports = createTables;
