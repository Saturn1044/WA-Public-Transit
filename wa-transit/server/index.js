require('dotenv').config();
const express = require('express');
const cors = require('cors');

const agenciesRouter = require('./routes/agencies');
const stopsRouter = require('./routes/stops');
const plannerRouter = require('./routes/planner');
const realtimeRouter = require('./routes/realtime');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/agencies', agenciesRouter);
app.use('/api/stops', stopsRouter);
app.use('/api/plan', plannerRouter);
app.use('/api/realtime', realtimeRouter);

app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`WA Transit API running on http://localhost:${PORT}`);
});
