  const express = require("express");
   const cors = require("cors");
   const bodyParser = require("body-parser");
   const authRoutes = require("./auth"); 
   const candidateRoutes = require("./candidates"); // Adjust the path as necessary
   const app = express();
   app.use(cors());
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use("/auth", authRoutes);
   app.use("/candidates", candidateRoutes);

   module.exports = app;