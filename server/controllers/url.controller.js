const axios = require('axios');
const { getToken } = require('../utils/auth');

// Mock database - replace with your actual database logic
const urlDatabase = new Map();

// Helper function for logging
async function log(level, pkg, message) {
  try {
    const token = await getToken();
    await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack: 'backend',
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
}

// Generate random shortcode
function generateShortcode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate URL format
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// CREATE SHORT URL
const createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    // Validate input
    if (!url) {
      await log('error', 'controller', 'URL is required');
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!isValidUrl(url)) {
      await log('error', 'controller', 'Invalid URL format');
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate or use provided shortcode
    const finalShortcode = shortcode || generateShortcode();
    
    // Check if shortcode already exists
    if (urlDatabase.has(finalShortcode)) {
      await log('error', 'controller', `Shortcode ${finalShortcode} already exists`);
      return res.status(409).json({ error: 'Shortcode already exists' });
    }

    // Create URL entry
    const urlEntry = {
      originalUrl: url,
      shortcode: finalShortcode,
      validity: validity || 7,
      clicks: 0,
      createdAt: new Date(),
      isActive: true
    };

    // Store in database (replace with your actual database logic)
    urlDatabase.set(finalShortcode, urlEntry);

    // Create response
    const response = {
      shortlink: `http://localhost:3000/${finalShortcode}`,
      originalUrl: url,
      shortcode: finalShortcode,
      validity: urlEntry.validity,
      createdAt: urlEntry.createdAt
    };

    await log('info', 'controller', `Created short URL: ${finalShortcode}`);
    res.status(201).json(response);

  } catch (error) {
    console.error('Error in createShortUrl:', error);
    await log('error', 'controller', `Error creating short URL: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET STATS
const getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;

    // Validate shortcode
    if (!shortcode || shortcode.trim() === '') {
      await log('error', 'controller', 'Shortcode is required');
      return res.status(400).json({ error: 'Shortcode is required' });
    }

    // Find URL entry (replace with your actual database logic)
    const urlEntry = urlDatabase.get(shortcode.trim());

    if (!urlEntry) {
      await log('error', 'controller', `Shortcode ${shortcode} not found`);
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    // Check if URL is still valid (based on validity period)
    const now = new Date();
    const createdAt = new Date(urlEntry.createdAt);
    const daysPassed = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (daysPassed > urlEntry.validity) {
      await log('error', 'controller', `Shortcode ${shortcode} has expired`);
      return res.status(410).json({ error: 'URL has expired' });
    }

    // Return stats
    const stats = {
      shortcode: urlEntry.shortcode,
      originalUrl: urlEntry.originalUrl,
      clicks: urlEntry.clicks,
      createdAt: urlEntry.createdAt,
      validity: urlEntry.validity,
      isActive: urlEntry.isActive,
      daysRemaining: Math.max(0, urlEntry.validity - Math.floor(daysPassed))
    };

    await log('info', 'controller', `Retrieved stats for: ${shortcode}`);
    res.json(stats);

  } catch (error) {
    console.error('Error in getStats:', error);
    await log('error', 'controller', `Error getting stats: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createShortUrl,
  getStats
};