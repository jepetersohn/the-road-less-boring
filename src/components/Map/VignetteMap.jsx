import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./VignetteMap.css";

export default function VignetteMap({ vignette }) {
    return(
    <>
    <MapContainer center={[vignette.lat, vignette.lng]} zoom={5}  className="vignette-map">
  <TileLayer
     attribution='&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
  <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  opacity={0.4}
/>
  <Marker position={[vignette.lat, vignette.lng]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </>
  );
}