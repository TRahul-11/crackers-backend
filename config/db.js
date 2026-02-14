const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'bqe9forjq3pehpwo8vsq-mysql.services.clever-cloud.com',
  user: 'ug9cojnluha1c67h',
  password: '6faIQ9P45EFJX82Jl2bF',
  database: 'bqe9forjq3pehpwo8vsq',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.log('DB Error:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = db;



