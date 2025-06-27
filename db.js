// db.js
const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('connection', (connection) => {
  console.log('🔗 MySQL pool connection created. Thread ID:', connection.threadId);
});

pool.on('acquire', (connection) => {
  console.log('⏳ Connection acquired. Thread ID:', connection.threadId);
});

pool.on('release', (connection) => {
  console.log('✅ Connection released. Thread ID:', connection.threadId);
});

pool.on('error', (err) => {
  console.error('❌ MySQL pool error:', err.message, err.code);
});

// Function to test and retry database connection on startup
const testDbConnection = (retries = 5, delay = 5000) => { // 5 retries, 5-second delay between attempts
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Initial database connection test failed:', err.message);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
      } else if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
        console.error('Database connection refused or timed out. Is MySQL running and accessible?');
        if (retries > 0) {
          console.log(`Retrying connection in ${delay / 1000} seconds... (${retries} retries left)`);
          setTimeout(() => testDbConnection(retries - 1, delay), delay);
        } else {
          console.error('Max retries reached. Could not connect to the database. Exiting process.');
          process.exit(1); // Exit if unable to connect after multiple retries
        }
      } else {
        // Other unhandled errors, log and exit
        console.error('Unhandled database connection error. Exiting process.');
        process.exit(1);
      }
    } else {
      console.log('🎉 Initial database connection test successful!');
      connection.release(); // Release the connection immediately after testing
    }
  });
};

// Start the connection test with retries
testDbConnection();


module.exports = pool;
