import express from 'express';
import { initializeDatabase, seedConflictZones, getConflictZones } from './db';
import { GetZonesResponse } from '../shared/types';

const app = express();

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

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser.`);
});