"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BIELSKO_BIALA = { lat: 49.8224, lng: 19.0448 };

const goldIcon = new L.DivIcon({
  className: "",
  html: `<div style="
    width: 24px;
    height: 24px;
    background: #caa775;
    border: 3px solid #1A1210;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

export default function ContactMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-56 md:h-72">
      <MapContainer
        center={BIELSKO_BIALA}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={BIELSKO_BIALA} icon={goldIcon}>
          <Popup>
            <span style={{ color: "#1A1210", fontWeight: 600 }}>
              Kapelusznik — Bielsko-Biała
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
