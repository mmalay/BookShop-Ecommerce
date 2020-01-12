const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('You have made a request');
});

module.exports = router;
