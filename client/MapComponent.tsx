
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ConflictZone, GetZonesResponse } from '../shared/types';

export const MapComponent: React.FC = () => {
  const [conflictZones, setConflictZones] = useState<ConflictZone[]>([]);

  useEffect(() => {
    fetchConflictZones();
  }, []);

  const fetchConflictZones = async () => {
    try {
      const response = await fetch('/api/zones');
      const data: GetZonesResponse = await response.json();
      setConflictZones(data.zones);
    } catch (error) {
      console.error('Error fetching conflict zones:', error);
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {conflictZones.map((zone) => (
        <Marker key={zone.id} position={[zone.latitude, zone.longitude]}>
          <Popup>
            <h3>{zone.name}</h3>
            <p>{zone.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};