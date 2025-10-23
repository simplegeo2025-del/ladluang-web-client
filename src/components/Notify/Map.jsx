import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'

const MapController = ({ selectedItem, filteredData }) => {
  const map = useMap()

  useEffect(() => {
    if (selectedItem) {
      map.setView([selectedItem.lat, selectedItem.lng], 14, { animate: true })
    } else if (filteredData.length > 0) {
      const bounds = filteredData.reduce((acc, item) => {
        acc.push([item.lat, item.lng])
        return acc
      }, [])
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [selectedItem, filteredData, map])

  return null
}

const Map = ({ selectedItem, filteredData, statusColor, typeEmoji, onMarkerClick }) => {
  return (
    <MapContainer
      key="map-container"
      center={[13.7563, 100.5018]}
      zoom={12}
      className="w-full h-[70vh]"
      scrollWheelZoom={false}
    >
      {/* <MapController selectedItem={selectedItem} filteredData={filteredData} /> */}
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredData.map((item) => (
        <CircleMarker
          key={item.id}
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
