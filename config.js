require('dotenv').config();

module.exports = {
  DB_HOST: process.env.DB_HOST ,
  DB_USER: process.env.DB_USER ,
  DB_PASS: process.env.DB_PASS ,
  DB_NAME: process.env.DB_NAME ,
  DB_PORT: process.env.DB_PORT || 3306,
  secret: process.env.SECRET
};



// const fs = require('fs');
// require('dotenv').config();

// module.exports = {
//     database: {
//         uri: process.env.DATABASE_URI,
//         // ssl: {
//         //     ca: fs.readFileSync(process.env.SSL_CA),
//         //     rejectUnauthorized: true
//         // }
//     },
//     secret: process.env.SECRET
// };
