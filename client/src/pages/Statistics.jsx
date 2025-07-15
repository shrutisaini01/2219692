import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const Statistics = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/shorturls').then((res) => setStats(res.data));
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {stats.map((url, index) => (
        <Box key={index} mb={3}>
          <Typography variant="h6">Short URL: http://localhost:3000/{url.shortCode}</Typography>
          <Typography>Original URL: {url.originalUrl}</Typography>
          <Typography>Created: {new Date(url.createdAt).toLocaleString()}</Typography>
          {url.expiresAt && <Typography>Expires: {new Date(url.expiresAt).toLocaleString()}</Typography>}
          <Typography>Total Clicks: {url.clickStats?.length || 0}</Typography>
          {url.clickStats?.map((click, i) => (
            <Box key={i} ml={2}>
              <Typography variant="body2">- Time: {new Date(click.timestamp).toLocaleString()}</Typography>
              <Typography variant="body2">- Source: {click.referrer || 'Unknown'}</Typography>
              <Typography variant="body2">- Location: {click.geoLocation || 'N/A'}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Statistics;
