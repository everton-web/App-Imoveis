import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowRight, MapPin, Bed, Bath, Maximize, Star } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice, formatArea } from '@/lib/utils'

async function getFeaturedProperties() {
    try {
        const properties = await prisma.property.findMany({
            where: {
                featured: true,
                status: 'AVAILABLE',
            },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                    take: 1,
                },
            },
            take: 6,
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

export default async function HomePage() {
    const featuredProperties = await getFeaturedProperties()

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>

                <div className="container-custom relative py-20 md:py-32">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Star className="w-4 h-4 text-accent-main" />
                            <span className="text-sm font-medium">Plataforma de Imóveis</span>
                        </div>

                        <h1 className="text-display-1 font-heading mb-6 leading-tight">
                            Encontre o Imóvel dos Seus{' '}
                            <span className="text-accent-main">Sonhos</span>
                        </h1>

                        <p className="text-body-lg text-white/90 mb-8 max-w-2xl">
                            Explore nossa seleção de imóveis com tecnologia de mapa interativo.
                            Qualidade, confiança e excelência em cada detalhe.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/imoveis">
                                <Button size="lg" variant="secondary">
                                    Ver Imóveis
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/mapa">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-main">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Explorar Mapa
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background-default dark:text-gray-950" />
                    </svg>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="section-spacing bg-background-default dark:bg-gray-950">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-display-2 font-heading text-text-primary mb-4">
                            Imóveis em Destaque
                        </h2>
                        <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                            Seleção exclusiva dos melhores imóveis disponíveis
                        </p>
                    </div>

                    {featuredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {featuredProperties.map((property) => (
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
                                            <div className="absolute top-4 right-4 bg-accent-main text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Destaque
                                            </div>
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
                            <p className="text-text-secondary">Nenhum imóvel em destaque no momento.</p>
                        </div>
                    )}

                    <div className="text-center">
                        <Link href="/imoveis">
                            <Button size="lg">
                                Ver Todos os Imóveis
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-spacing bg-gradient-to-br from-secondary-light to-secondary-main dark:from-gray-800 dark:to-gray-900">
                <div className="container-custom text-center">
                    <h2 className="text-display-2 font-heading text-text-primary mb-4">
                        Explore no Mapa Interativo
                    </h2>
                    <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
                        Visualize todos os imóveis disponíveis em um mapa interativo.
                        Encontre a localização perfeita para você.
                    </p>
                    <Link href="/mapa">
                        <Button size="lg">
                            <MapPin className="w-5 h-5 mr-2" />
                            Abrir Mapa
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
