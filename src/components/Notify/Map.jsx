import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = defaultIcon

function MapController({ selectedItem, points }) {
  const map = useMap()

  const bounds = useMemo(() => {
    if (!points?.length) return null
    return L.latLngBounds(points.map(p => [p.lat, p.lng]))
  }, [points])

  useEffect(() => {
    map.invalidateSize()
    if (selectedItem) {
      map.setView([selectedItem.lat, selectedItem.lng], 14, { animate: true })
      return
    }
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [selectedItem, bounds, map])

  return null
}

const Map = ({ selectedItem, filteredData, statusColor, typeEmoji, onMarkerClick }) => {
  const [mounted, setMounted] = useState(false)
  const markerRefs = useRef({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && selectedItem && markerRefs.current[selectedItem.id]) {
      markerRefs.current[selectedItem.id].openPopup()
    }
  }, [mounted, selectedItem])

  if (!mounted) return null

  const center = [13.7563, 100.5018]

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full"
      style={{ height: '70vh', width: '100%', zIndex: 1 }}
      scrollWheelZoom={false}
    >
      <MapController selectedItem={selectedItem} points={filteredData} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredData.map((item) => (
        <CircleMarker
          key={item.id}
          ref={(ref) => { if (ref) markerRefs.current[item.id] = ref }}
          center={[item.lat, item.lng]}
          radius={selectedItem?.id === item.id ? 12 : 9}
          pathOptions={{
            color: statusColor[item.status]?.stroke || '#1f2937',
            fillColor: statusColor[item.status]?.stroke || '#1f2937',
            fillOpacity: selectedItem?.id === item.id ? 1 : 0.85,
            weight: selectedItem?.id === item.id ? 3 : 2
          }}
          eventHandlers={{
            click: () => onMarkerClick(item)
          }}
        >
          <Popup>
            <div className="min-w-[220px]">
              <div className="font-semibold text-sm mb-1">{item.title}</div>
              <div className="text-xs text-gray-600 mb-2">{typeEmoji[item.type] || ''} {item.type}</div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block px-2 py-0.5 text-[11px] rounded ${statusColor[item.status]?.tw || ''}`}>
                  {item.status}
                </span>
                <span className="text-gray-500">{item.date}</span>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default Map
