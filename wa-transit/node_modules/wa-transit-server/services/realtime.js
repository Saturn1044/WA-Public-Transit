const axios = require('axios');

const OBA_BASE = process.env.OBA_BASE_URL || 'https://api.pugetsound.onebusaway.org';
const OBA_KEY = process.env.OBA_API_KEY || 'TEST';

// Map our internal stop IDs to OneBusAway stop IDs (Puget Sound agencies only)
const OBA_STOP_MAP = {
  westlake: '1_1108',
  capitol_hill: '1_99610',
  uw_station: '1_99605',
  northgate: '1_99603',
  sodo: '1_99613',
  beacon_hill: '1_99616',
  columbia_city: '1_99619',
  rainier_beach: '1_99623',
  seatac: '1_99624',
  tukwila_link: '1_99625',
  angle_lake: '1_99629',
  intl_dist: '1_99610',
  shoreline_148th: '40_99602',
  shoreline_185th: '40_99601',
  mountlake_terrace: '40_99600',
  lynnwood: '40_99599',
  tacoma_dome: '3_TDS',
  bellevue_downtown: '40_99607',
  redmond_tech: '1_99608',
};

async function getArrivals(stopId) {
  const obaStopId = OBA_STOP_MAP[stopId];
  if (!obaStopId) {
    return { stopId, arrivals: [], note: 'Real-time not available for this stop' };
  }

  try {
    const url = `${OBA_BASE}/api/where/arrivals-and-departures-for-stop/${obaStopId}.json`;
    const res = await axios.get(url, {
      params: { key: OBA_KEY, minutesBefore: 0, minutesAfter: 60 },
      timeout: 5000,
    });

    const data = res.data?.data;
    if (!data) return { stopId, arrivals: [] };

    const arrivals = (data.entry?.arrivalsAndDepartures || []).map(dep => ({
      route: dep.routeShortName || dep.routeLongName,
      headsign: dep.tripHeadsign,
      scheduledTime: dep.scheduledArrivalTime,
      predictedTime: dep.predictedArrivalTime,
      onTime: dep.predicted ? (dep.predictedArrivalTime - dep.scheduledArrivalTime < 60000) : null,
      status: dep.predicted
        ? getStatus(dep.scheduledArrivalTime, dep.predictedArrivalTime)
        : 'Scheduled',
      vehicles: dep.vehicleId ? [dep.vehicleId] : [],
    }));

    return {
      stopId,
      stopName: data.references?.stops?.find(s => s.id === obaStopId)?.name,
      arrivals,
      retrievedAt: new Date().toISOString(),
    };
  } catch (err) {
    if (err.code === 'ECONNABORTED' || err.response?.status === 401) {
      return { stopId, arrivals: [], note: 'Real-time data temporarily unavailable' };
    }
    throw err;
  }
}

function getStatus(scheduled, predicted) {
  const diffSeconds = (predicted - scheduled) / 1000;
  if (Math.abs(diffSeconds) < 60) return 'On Time';
  if (diffSeconds > 0) return `${Math.round(diffSeconds / 60)} min late`;
  return `${Math.round(-diffSeconds / 60)} min early`;
}

// WSF Ferry real-time (no auth required)
async function getFerryCrossings(routeCode) {
  try {
    const url = `https://www.wsdot.wa.gov/ferries/api/schedule/rest/sailings/${routeCode}?apiaccesscode=`;
    const res = await axios.get(url, { timeout: 5000 });
    return res.data || [];
  } catch {
    return [];
  }
}

module.exports = { getArrivals, getFerryCrossings };
