  const express = require("express");
  const router = express.Router();

   const authRoutes = require("./auth"); 
   const candidateRoutes = require("./candidates"); // Adjust the path as necessary
   

  const app = () => {
    authRoutes(router)
    candidateRoutes(router)
    return router;
  };

   module.exports = app;