// api2.js
const express = require('express');
const router = express.Router();

// Define routes for API 2
router.get('/endpoint2', (req, res) => {
  res.send('Response from API 2 - Endpoint 2');
});

module.exports = router;