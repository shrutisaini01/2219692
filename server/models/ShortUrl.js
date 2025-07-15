const mongoose = require('mongoose'); // Import mongoose to define schemas and models

// Define a schema for each click on the shortened URL
const ClickSchema = new mongoose.Schema({
  timestamp: Date,       // When the short URL was clicked
  referrer: String,      // Where the click came from (e.g., another website)
  location: String       // Coarse geographical location of the click (if available)
});

// Define the main schema for the shortened URL
const ShortUrlSchema = new mongoose.Schema({
  url: {                 // The original long URL that will be shortened
    type: String,
    required: true       // Must be provided
  },
  shortcode: {           // The unique code used to access the short URL
    type: String,
    unique: true         // No two URLs can have the same shortcode
  },
  createdAt: {           // Timestamp when the short URL was created
    type: Date,
    default: Date.now    // Default value is the current time
  },
  expiresAt: Date,       // Timestamp when the short URL will expire
  clicks: [ClickSchema]  // Array of click data using the ClickSchema defined above
});

// Export the Mongoose model to use in routes and controllers
module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
