const express = require('express');
const router = express.Router();
const { planTrip, searchStops } = require('../services/routing');

// POST /api/plan — plan a trip
// Body: { origin: stopId, destination: stopId }
router.post('/', (req, res) => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'origin and destination are required' });
  }

  const result = planTrip(origin, destination);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.json(result);
});

// GET /api/plan?origin=id&destination=id — same as POST but via query params
router.get('/', (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'origin and destination query params are required' });
  }

  const result = planTrip(origin, destination);

  if (result.error) {
    return res.status(404).json({ error: result.error });
  }

  res.json(result);
});

module.exports = router;
