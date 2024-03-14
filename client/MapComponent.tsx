import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ConflictZone, GetZonesResponse } from '../shared/types';

const SetViewWhenReady: React.FC<{ center: LatLngExpression; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

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

  const initialCenter: LatLngExpression = [0, 0];
  const initialZoom: number = 2;

  return (
    <MapContainer style={{ height: '400px' }}>
      <SetViewWhenReady center={initialCenter} zoom={initialZoom} />
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