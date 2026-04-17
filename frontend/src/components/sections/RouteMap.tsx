"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Workaround: domyślne ikony markerów Leaflet nie ładują się z Next/Webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface RouteMapProps {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
  geometry: [number, number][]; // [lng, lat][]
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    const bounds = L.latLngBounds(positions.map(([lat, lng]) => [lat, lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [positions, map]);
  return null;
}

export default function RouteMap({ from, to, geometry }: RouteMapProps) {
  // ORS zwraca [lng, lat] — Leaflet oczekuje [lat, lng]
  const polyline: [number, number][] = geometry.map(([lng, lat]) => [lat, lng]);
  const bounds: [number, number][] =
    polyline.length > 0 ? polyline : [[from.lat, from.lng], [to.lat, to.lng]];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-72 md:h-96 relative">
      <MapContainer
        center={[from.lat, from.lng]}
        zoom={6}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.85)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polyline.length > 0 && (
          <Polyline positions={polyline} pathOptions={{ color: "#caa775", weight: 4, opacity: 0.9 }} />
        )}
        <Marker position={[from.lat, from.lng]} />
        <Marker position={[to.lat, to.lng]} />
        <FitBounds positions={bounds} />
      </MapContainer>
    </div>
  );
}
