const express = require('express');
const { createShortUrl, getStats } = require('../controllers/url.controller');
const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortcode', getStats);

module.exports = router;
