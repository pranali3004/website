const express = require('express');
const path = require('path');
const schemes = require('./schemes.json'); // Import the scheme data

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get schemes with filtering
app.get('/api/schemes', (req, res) => {
  let filteredSchemes = schemes;

  // Get query parameters from the URL (e.g., /api/schemes?state=Maharashtra)
  const { state, category } = req.query;

  // Filter by state if the state query parameter is present and not 'all'
  if (state && state !== 'all') {
    // We include 'Central' schemes for every state selection
    filteredSchemes = filteredSchemes.filter(scheme => scheme.state === state || scheme.state === 'Central');
  }

  // Filter by category if the category query parameter is present and not 'all'
  if (category && category !== 'all') {
    filteredSchemes = filteredSchemes.filter(scheme => scheme.category === category);
  }

  res.json(filteredSchemes);
});

// Start the server
app.listen(PORT, () => {
  console.log(🌾 Krishi Mitra Portal server running at http://localhost:${PORT});
});