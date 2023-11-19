// api1.js
const express = require('express');
const router = express.Router();

// Define routes for API 1
router.get('/endpoint1', (req, res) => {
  res.send('Response from API 1 - Endpoint 1');
});

module.exports = router;