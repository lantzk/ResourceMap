import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapComponent } from './MapComponent';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Resource Conflict Zone Map</h1>
      <MapComponent />
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}