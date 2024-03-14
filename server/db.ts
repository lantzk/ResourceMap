import sqlite3 from 'sqlite3';
import { ConflictZone } from '../shared/types';

const db = new sqlite3.Database(':memory:');

export function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS conflict_zones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL
      )
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getConflictZones(): Promise<ConflictZone[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM conflict_zones', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function seedConflictZones() {
  const zones: ConflictZone[] = [
    {
      id: 1,
      name: 'Zone 1',
      description: 'Potential conflict zone over water resources',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 2,
      name: 'Zone 2',
      description: 'Potential conflict zone over oil reserves',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    // Add more conflict zones here
  ];

  const insertPromises = zones.map((zone) => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO conflict_zones (name, description, latitude, longitude) VALUES (?, ?, ?, ?)',
        [zone.name, zone.description, zone.latitude, zone.longitude],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  });

  return Promise.all(insertPromises);
}