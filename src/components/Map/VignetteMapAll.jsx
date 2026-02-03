import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import './VignetteMap.css';

function FitBounds({ vignettes }) {
  const map = useMap();

  if (vignettes.length) {
    const bounds = L.latLngBounds(
      vignettes.map(v => [v.lat, v.lng])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}

export default function VignetteMap({ vignettes }) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className="vignette-map"
    >
      <TileLayer
        attribution='&copy; Esri — Source: Esri, Maxar, Earthstar Geographics'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.4}
      />

      <FitBounds vignettes={vignettes} />

      {vignettes.map(vignette => (
        <Marker
          key={vignette.id}
          position={[vignette.lat, vignette.lng]}
        >
          <Popup>
            <Link to={`/${vignette.id}`}>
              {vignette.title}
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
