'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/Card'
import { Loader2 } from 'lucide-react'

// Dynamically import the map component to avoid SSR issues
const PropertyMap = dynamic(() => import('@/components/Map/PropertyMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary-light dark:bg-gray-900">
            <Loader2 className="w-12 h-12 animate-spin text-primary-main" />
        </div>
    ),
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

export default function MapPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await fetch('/api/properties')
                const data = await response.json()
                setProperties(data)
            } catch (error) {
                console.error('Error fetching properties:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary-light dark:bg-gray-900">
                <Loader2 className="w-12 h-12 animate-spin text-primary-main" />
            </div>
        )
    }

    return (
        <div className="relative">
            <PropertyMap properties={properties} />
        </div>
    )
}
