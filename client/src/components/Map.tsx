import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { TowerData } from 'shared'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in Leaflet with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icon for towers
const towerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2zm0 3.5L6.5 17.5h11L12 5.5z" fill="#e74c3c"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface MapProps {
  towers: TowerData[]
  onTowerSelect: (tower: TowerData) => void
}

const MapComponent: React.FC<MapProps> = ({ towers, onTowerSelect }) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={[40.7128, -74.0060]} // New York as default center
        zoom={3} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {towers.map((tower) => (
          <Marker
            key={tower.id}
            position={[tower.latitude, tower.longitude]}
            icon={towerIcon}
            eventHandlers={{
              click: () => onTowerSelect(tower),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{tower.carrier} Tower</h3>
                <p><strong>Type:</strong> {tower.towerType}</p>
                <p><strong>Location:</strong> {tower.latitude.toFixed(4)}, {tower.longitude.toFixed(4)}</p>
                {tower.frequency && <p><strong>Frequency:</strong> {tower.frequency} MHz</p>}
                {tower.signalStrength && <p><strong>Signal:</strong> {tower.signalStrength} dBm</p>}
                <p><strong>Submitted by:</strong> {tower.submittedBy}</p>
                <p className={`text-sm ${tower.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {tower.verified ? '✓ Verified' : '⏳ Pending verification'}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent 