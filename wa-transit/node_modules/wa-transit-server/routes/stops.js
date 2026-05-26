const express = require('express');
const router = express.Router();
const { stops } = require('../data/network');
const stopAddresses = require('../data/stopAddresses');
const { searchStops } = require('../services/routing');

// Merge address into every stop object
const stopsWithAddresses = Object.fromEntries(
  Object.entries(stops).map(([id, stop]) => [
    id,
    { ...stop, address: stopAddresses[id] || null },
  ])
);

// GET /api/stops — list all stops (or ?agency= filter)
router.get('/', (req, res) => {
  const { agency } = req.query;
  let result = Object.values(stopsWithAddresses);
  if (agency) result = result.filter(s => s.agencies && s.agencies.includes(agency));
  res.json(result);
});

// GET /api/stops/search?q=query — fuzzy search stops (with addresses)
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }
  const raw = searchStops(q);
  const withAddr = raw.map(s => ({ ...s, address: stopAddresses[s.id] || null }));
  res.json(withAddr);
});

// GET /api/stops/:id — single stop with address
router.get('/:id', (req, res) => {
  const stop = stopsWithAddresses[req.params.id];
  if (!stop) return res.status(404).json({ error: 'Stop not found' });
  res.json(stop);
});

module.exports = router;
