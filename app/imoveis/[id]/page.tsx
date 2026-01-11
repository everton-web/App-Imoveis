import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MapPin, Bed, Bath, Maximize, Car, Mail, Phone } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatArea } from '@/lib/utils'

async function getProperty(id: string) {
    try {
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })
        return property
    } catch (error) {
        return null
    }
}

export default async function PropertyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const property = await getProperty(id)

    if (!property) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background-subtle dark:bg-gray-950">
            {/* Image Gallery */}
            <div className="w-full bg-black">
                <div className="container-custom py-8">
                    {property.images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden">
                                <Image
                                    src={property.images[0].url}
                                    alt={property.images[0].alt || property.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {property.images.length > 1 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {property.images.slice(1, 5).map((image) => (
                                        <div key={image.id} className="relative h-44 md:h-72 rounded-lg overflow-hidden">
                                            <Image
                                                src={image.url}
                                                alt={image.alt || property.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-96 bg-secondary-light dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <MapPin className="w-24 h-24 text-text-muted" />
                        </div>
                    )}
                </div>
            </div>

            {/* Property Details */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-display-2 font-heading text-text-primary mb-4">
                                {property.title}
                            </h1>
                            <div className="flex items-center text-text-secondary mb-6">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span className="text-lg">
                                    {property.address}, {property.city} - {property.state}
                                </span>
                            </div>
                            <div className="text-4xl font-bold text-primary-main mb-8">
                                {formatPrice(Number(property.price))}
                            </div>
                        </div>

                        {/* Features */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-heading-3 font-heading mb-4">Características</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {property.bedrooms && (
                                        <div className="flex flex-col items-center p-4 bg-secondary-light dark:bg-gray-800 rounded-lg">
                                            <Bed className="w-8 h-8 text-primary-main mb-2" />
                                            <span className="text-2xl font-bold text-text-primary">{property.bedrooms}</span>
                                            <span className="text-sm text-text-secondary">Quartos</span>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="flex flex-col items-center p-4 bg-secondary-light dark:bg-gray-800 rounded-lg">
                                            <Bath className="w-8 h-8 text-primary-main mb-2" />
                                            <span className="text-2xl font-bold text-text-primary">{property.bathrooms}</span>
                                            <span className="text-sm text-text-secondary">Banheiros</span>
                                        </div>
                                    )}
                                    {property.area && (
                                        <div className="flex flex-col items-center p-4 bg-secondary-light dark:bg-gray-800 rounded-lg">
                                            <Maximize className="w-8 h-8 text-primary-main mb-2" />
                                            <span className="text-2xl font-bold text-text-primary">{Number(property.area)}</span>
                                            <span className="text-sm text-text-secondary">m²</span>
                                        </div>
                                    )}
                                    {property.parkingSpots && (
                                        <div className="flex flex-col items-center p-4 bg-secondary-light dark:bg-gray-800 rounded-lg">
                                            <Car className="w-8 h-8 text-primary-main mb-2" />
                                            <span className="text-2xl font-bold text-text-primary">{property.parkingSpots}</span>
                                            <span className="text-sm text-text-secondary">Vagas</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-heading-3 font-heading mb-4">Descrição</h2>
                                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Additional Features */}
                        {property.features.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-heading-3 font-heading mb-4">Diferenciais</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {property.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-secondary-light dark:bg-gray-800 text-text-primary rounded-full text-sm"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-20">
                            <CardContent className="p-6">
                                <h3 className="text-heading-3 font-heading mb-4">Entre em Contato</h3>
                                <p className="text-text-secondary mb-6">
                                    Interessado neste imóvel? Entre em contato conosco!
                                </p>
                                <div className="space-y-4">
                                    <Button className="w-full" size="lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Ligar Agora
                                    </Button>
                                    <Button variant="secondary" className="w-full" size="lg">
                                        <Mail className="w-5 h-5 mr-2" />
                                        Enviar Email
                                    </Button>
                                </div>
                                <div className="mt-6 pt-6 border-t border-border-light dark:border-gray-800">
                                    <p className="text-sm text-text-secondary">
                                        <strong>Código do imóvel:</strong><br />
                                        {property.id.slice(0, 8).toUpperCase()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
