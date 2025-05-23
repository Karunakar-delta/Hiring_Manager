const fs = require('fs');
require('dotenv').config();

module.exports = {
    database: {
        uri: process.env.DATABASE_URI,
        ssl: {
            ca: fs.readFileSync(process.env.SSL_CA),
            rejectUnauthorized: true
        }
    },
    secret: process.env.SECRET
};
