import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Alert
} from '@mui/material';
import axios from 'axios';

const URLShortener = () => {
  const [urls, setUrls] = useState([
    { originalUrl: '', validity: '', shortcode: '' }
  ]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    const validUrls = urls
      .filter((u) => u.originalUrl.trim() !== '')
      .map((u) => ({
        url: u.originalUrl.trim(),
        originalUrl: u.originalUrl.trim(),
        ...(u.shortcode?.trim() && { shortcode: u.shortcode.trim() }),
        ...(u.validity && !isNaN(Number(u.validity)) && {
          validity: Number(u.validity)
        })
      }));

    if (validUrls.length === 0) {
      setError('Please enter at least one valid Original URL.');
      return;
    }

    // Validate URLs
    const invalidUrls = validUrls.filter((u) => {
      try {
        new URL(u.originalUrl);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      setError('Please enter valid URLs (include https:// or http://)');
      return;
    }

    try {
      setResults([]); // Clear previous results
      const responses = await Promise.all(
        validUrls.map((url) =>
          axios.post('http://localhost:3000/shorturls', url)
        )
      );
      setResults(responses.map((r) => r.data));
      setError('');
    } catch (err) {
      console.error('Full error:', err);

      if (err.response) {
        const errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error: ${err.response.status}`;
        setError(errorMessage);
      } else if (err.request) {
        setError(
          'Network error. Please check if the server is running on localhost:3000'
        );
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Shorten URLs
      </Typography>

      {urls.map((url, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Original URL"
                fullWidth
                required
                value={url.originalUrl}
                onChange={(e) =>
                  handleChange(index, 'originalUrl', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                type="number"
                value={url.validity}
                onChange={(e) =>
                  handleChange(index, 'validity', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Preferred Shortcode"
                fullWidth
                value={url.shortcode}
                onChange={(e) =>
                  handleChange(index, 'shortcode', e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Shorten
        </Button>
        <Button
          variant="outlined"
          onClick={addField}
          disabled={urls.length >= 5}
          sx={{ ml: 2 }}
        >
          Add URL
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Results</Typography>
        {results.map((r, i) => (
          <Box
            key={i}
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2
            }}
          >
            <Typography>Original: {r.originalUrl}</Typography>
            <Typography>
              Short URL:{' '}
              <a
                href={`http://localhost:3000/${r.shortcode || r.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:3000/{r.shortcode || r.shortCode}
              </a>
            </Typography>
            {r.expiresAt && (
              <Typography>
                Expires At: {new Date(r.expiresAt).toLocaleString()}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default URLShortener;
