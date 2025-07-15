import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import axios from 'axios';

const URLShortener = () => {
  const [urls, setUrls] = useState([{ originalUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

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
    const responses = await Promise.all(
      urls.map((url) => axios.post('http://localhost:3000/shorturls', url))
    );
    setResults(responses.map((r) => r.data));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Shorten URLs</Typography>
      {urls.map((url, index) => (
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Original URL"
                fullWidth
                required
                value={url.originalUrl}
                onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                type="number"
                value={url.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Preferred Shortcode"
                fullWidth
                value={url.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Shorten</Button>
      <Button variant="outlined" onClick={addField} disabled={urls.length >= 5} sx={{ ml: 2 }}>Add URL</Button>

      <Box mt={4}>
        <Typography variant="h5">Results</Typography>
        {results.map((r, i) => (
          <Box key={i}>
            <Typography>Original: {r.originalUrl}</Typography>
            <Typography>Short URL: http://localhost:3000/{r.shortCode}</Typography>
            {r.expiresAt && <Typography>Expires At: {new Date(r.expiresAt).toLocaleString()}</Typography>}
            <hr />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default URLShortener;
