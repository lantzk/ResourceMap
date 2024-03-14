
import { app } from './run_express';
import { initializeDatabase, seedConflictZones, getConflictZones } from './db';
import { GetZonesResponse } from '../shared/types';

initializeDatabase()
  .then(() => {
    return seedConflictZones();
  })
  .then(() => {
    console.log('Database initialized and seeded');
  })
  .catch((err) => {
    console.error('Error initializing database:', err);
  });

app.get('/api/zones', async (req, res) => {
  try {
    const zones = await getConflictZones();
    const response: GetZonesResponse = { zones };
    res.json(response);
  } catch (err) {
    console.error('Error fetching conflict zones:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
