'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Property {
  id: string
  title: string
  price: number
  city: string
  state: string
  latitude: number
  longitude: number
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  images: { url: string }[]
}

interface PropertyMapProps {
  properties: Property[]
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map with globe view - centered on world with low zoom
    const map = L.map(mapContainerRef.current, {
      center: [20, 0], // Center of world
      zoom: 2, // Low zoom for globe effect
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: true,
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      noWrap: false, // Allow wrapping for globe effect
    }).addTo(map)

    mapRef.current = map

    // Add markers for each property
    if (properties.length > 0) {
      const bounds = L.latLngBounds([])

      properties.forEach((property) => {
        const marker = L.marker([property.latitude, property.longitude])

        // Create custom popup
        const popupContent = `
          <div class="p-2 min-w-[250px]">
            ${property.images[0] ? `
              <img 
                src="${property.images[0].url}" 
                alt="${property.title}"
                class="w-full h-32 object-cover rounded-lg mb-2"
              />
            ` : ''}
            <h3 class="font-bold text-base mb-1 line-clamp-2">${property.title}</h3>
            <p class="text-sm text-gray-600 mb-2">${property.city}, ${property.state}</p>
            <div class="flex items-center justify-between mb-2">
              ${property.bedrooms ? `<span class="text-xs">🛏️ ${property.bedrooms}</span>` : ''}
              ${property.bathrooms ? `<span class="text-xs">🚿 ${property.bathrooms}</span>` : ''}
              ${property.area ? `<span class="text-xs">📐 ${property.area}m²</span>` : ''}
            </div>
            <p class="font-bold text-lg text-[#1C3F3A] mb-2">${formatPrice(property.price)}</p>
            <a 
              href="/imoveis/${property.id}"
              class="block w-full text-center bg-[#1C3F3A] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#16332F] transition-colors"
            >
              Ver Detalhes
            </a>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        })
        marker.addTo(map)

        bounds.extend([property.latitude, property.longitude])
      })

      // Fit map to show all markers
      if (properties.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [properties])

  return (
    <>
      <div
        ref={mapContainerRef}
        className="w-full h-[calc(100vh-4rem)]"
        style={{ zIndex: 0 }}
      />
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-popup-close-button {
          font-size: 24px !important;
          padding: 8px 12px !important;
        }
      `}</style>
    </>
  )
}
