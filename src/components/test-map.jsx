import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---- Fix default marker icons in many bundlers (Vite/CRA/Next) ----
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// ---- Helper: Fit map to all markers ----
function FitToMarkers({ points }) {
  const map = useMap();
  const bounds = useMemo(() => {
    if (!points?.length) return null;
    return L.latLngBounds(points.map((p) => [p.lat, p.lng]));
  }, [points]);

  React.useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [40, 40] });
  }, [bounds, map]);
  return null;
}

// ---- Add marker on map click ----
function ClickToAddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd({ lat: e.latlng.lat, lng: e.latlng.lng, label: "New point" });
    },
  });
  return null;
}

// ---- Floating control panel ----
function Controls({ onFit, onClear }) {
  return (
    <div style={{
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 1000,
      display: "flex",
      gap: 8,
    }}>
      <button onClick={onFit} style={btnStyle}>Fit to markers</button>
      <button onClick={onClear} style={btnStyle}>Clear</button>
    </div>
  );
}

const btnStyle = {
  background: "white",
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer",
  boxShadow: "0 1px 4px rgba(0,0,0,.15)",
};

// ---- Demo component ----
export default function TestMap() {
  // Seed markers (Bangkok, Chiang Mai, Phuket)
  const [markers, setMarkers] = useState([
    { id: 1, lat: 13.7563, lng: 100.5018, label: "Bangkok" },
    { id: 2, lat: 18.7883, lng: 98.9853, label: "Chiang Mai" },
    { id: 3, lat: 7.8804, lng: 98.3923, label: "Phuket" },
  ]);

  const center = [15.87, 100.99]; // Thailand-ish center
  const zoom = 5.3;

  const handleAdd = (p) => {
    setMarkers((prev) => [
      ...prev,
      { id: Date.now(), ...p, label: `${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}` },
    ]);
  };

  const handleFit = () => {
    // by toggling a key we can re-trigger FitToMarkers via markers state
    setMarkers((prev) => [...prev]);
  };

  const handleClear = () => setMarkers([]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Controls onFit={handleFit} onClear={handleClear} />

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* click anywhere to add a marker */}
        <ClickToAddMarker onAdd={handleAdd} />

        {/* fit to all current markers */}
        <FitToMarkers points={markers} />

        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              <b>{m.label}</b>
              <div style={{ marginTop: 4 }}>
                lat: {m.lat.toFixed(5)} | lng: {m.lng.toFixed(5)}
              </div>
              <button
                style={{ ...btnStyle, marginTop: 8 }}
                onClick={() => setMarkers((prev) => prev.filter((x) => x.id !== m.id))}
              >
                Remove
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
