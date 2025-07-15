import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import URLShortener from './pages/URLShortener';
import Statistics from './pages/Statistics';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<URLShortener />} />
      <Route path="/stats" element={<Statistics />} />
    </Routes>
  </>
);

export default App;
