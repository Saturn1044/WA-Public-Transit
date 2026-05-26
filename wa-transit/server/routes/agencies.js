const express = require('express');
const router = express.Router();
const agencies = require('../data/agencies');

// GET /api/agencies — list all agencies (optional ?region= filter)
router.get('/', (req, res) => {
  const { region, mode } = req.query;
  let result = agencies;
  if (region) result = result.filter(a => a.region === region);
  if (mode) result = result.filter(a => a.modes.includes(mode));
  res.json(result);
});

// GET /api/agencies/:id — single agency detail
router.get('/:id', (req, res) => {
  const agency = agencies.find(a => a.id === req.params.id);
  if (!agency) return res.status(404).json({ error: 'Agency not found' });
  res.json(agency);
});

// GET /api/agencies/regions/list — distinct region values
router.get('/regions/list', (req, res) => {
  const regions = [...new Set(agencies.map(a => a.region))].sort();
  res.json(regions);
});

module.exports = router;
