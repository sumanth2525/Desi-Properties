import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { formatPrice } from '../data/seedListings';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ListingsMap({ listings, onSelect }) {
  const center = listings.length
    ? [listings.reduce((s, l) => s + l.lat, 0) / listings.length, listings.reduce((s, l) => s + l.lng, 0) / listings.length]
    : [39.8283, -98.5795];

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((l) => (
          <Marker key={l.id} position={[l.lat, l.lng]} icon={icon}>
            <Popup>
              <strong>{l.title}</strong>
              <br />
              {formatPrice(l.price, l.priceLabel || '')} · {l.location}
              <br />
              <button
                type="button"
                style={{ marginTop: 8, cursor: 'pointer' }}
                onClick={() => onSelect?.(l.id)}
              >
                View details
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
