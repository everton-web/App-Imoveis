import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { MapPin, Bed, Bath, Maximize } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatArea } from '@/lib/utils'

async function getProperties() {
    try {
        const properties = await prisma.property.findMany({
            where: {
                status: 'AVAILABLE',
            },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return properties
    } catch (error) {
        console.error('Error fetching properties:', error)
        return []
    }
}

export default async function PropertiesPage() {
    const properties = await getProperties()

    return (
        <div className="min-h-screen bg-background-subtle dark:bg-gray-950">
            {/* Header */}
            <div className="bg-primary-main text-white py-16">
                <div className="container-custom">
                    <h1 className="text-display-2 font-heading mb-4">
                        Nossos Imóveis
                    </h1>
                    <p className="text-body-lg text-white/90 max-w-2xl">
                        Explore nossa seleção completa de imóveis disponíveis
                    </p>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="container-custom py-12">
                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <Link key={property.id} href={`/imoveis/${property.id}`}>
                                <Card className="hover-lift overflow-hidden h-full">
                                    <div className="relative h-64 bg-secondary-light dark:bg-gray-800">
                                        {property.images[0] ? (
                                            <Image
                                                src={property.images[0].url}
                                                alt={property.images[0].alt || property.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <MapPin className="w-16 h-16 text-text-muted" />
                                            </div>
                                        )}
                                        {property.featured && (
                                            <div className="absolute top-4 right-4 bg-accent-main text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Destaque
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-heading-3 font-heading text-text-primary mb-2 line-clamp-1">
                                            {property.title}
                                        </h3>
                                        <div className="flex items-center text-text-secondary mb-3">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{property.city}, {property.state}</span>
                                        </div>
                                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                            {property.description}
                                        </p>
                                        <div className="flex items-center justify-between mb-4 text-text-secondary text-sm">
                                            {property.bedrooms && (
                                                <div className="flex items-center">
                                                    <Bed className="w-4 h-4 mr-1" />
                                                    <span>{property.bedrooms}</span>
                                                </div>
                                            )}
                                            {property.bathrooms && (
                                                <div className="flex items-center">
                                                    <Bath className="w-4 h-4 mr-1" />
                                                    <span>{property.bathrooms}</span>
                                                </div>
                                            )}
                                            {property.area && (
                                                <div className="flex items-center">
                                                    <Maximize className="w-4 h-4 mr-1" />
                                                    <span>{formatArea(Number(property.area))}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-2xl font-bold text-primary-main">
                                            {formatPrice(Number(property.price))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-text-secondary">Nenhum imóvel disponível no momento.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
