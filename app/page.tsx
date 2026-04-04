import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowRight, MapPin, Bed, Bath, Maximize, Star, Building2 } from 'lucide-react'
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
            <section className="relative min-h-screen flex items-center text-gray-900 overflow-hidden bg-[#FAFAFA] pt-24 pb-20">
                {/* Aetheos Tech style glow backgrounds */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-main/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-main/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
                
                <div className="container-custom relative flex flex-col items-center justify-center text-center w-full z-10">
                    <div className="inline-flex items-center space-x-2 bg-black/5 border border-black/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 mt-12">
                        <span className="text-xs font-semibold text-primary-main tracking-widest uppercase">Experiência Elevada</span>
                    </div>

                    <h1 className="text-display-1 md:text-[5.5rem] font-heading mb-8 leading-[1.05] tracking-tight max-w-5xl mx-auto text-gray-900">
                        A evolução na busca pelo <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-primary-main/80">imóvel perfeito.</span>
                    </h1>

                    <p className="text-body-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium">
                        Explore propriedades premium através de uma plataforma moderna, com pesquisa inteligente e mapa interativo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link href="/imoveis">
                            <Button size="lg" className="px-10 py-6 text-lg">
                                <Building2 className="w-5 h-5 mr-2" />
                                Acessar Imóveis
                            </Button>
                        </Link>
                        <Link href="/mapa">
                            <Button size="lg" variant="outline" className="px-10 py-6 text-lg backdrop-blur-md">
                                <MapPin className="w-5 h-5 mr-2" />
                                Explorar Mapa
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section (Aetheos inspired) */}
            <section className="py-24 bg-[#FAFAFA] relative z-10 border-b border-black/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Benefit 1 */}
                        <div className="bg-white border border-black/5 rounded-[10px] p-8 hover:bg-gray-50 transition-smooth group relative overflow-hidden flex flex-col items-start text-left shadow-sm">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-main/5 rounded-full blur-2xl group-hover:bg-primary-main/10 transition-smooth"></div>
                            <div className="w-12 h-12 rounded-lg bg-primary-main/10 border border-primary-main/20 flex items-center justify-center mb-6 relative z-10">
                                <Maximize className="w-6 h-6 text-primary-main" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Busca Inteligente</h4>
                            <p className="text-sm text-text-secondary leading-relaxed relative z-10">Filtros avançados e precisos para encontrar exatamente a propriedade que atende a todas as suas exigências.</p>
                        </div>
                        {/* Benefit 2 */}
                        <div className="bg-white border border-black/5 rounded-[10px] p-8 hover:bg-gray-50 transition-smooth group relative overflow-hidden flex flex-col items-start text-left shadow-sm">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-main/5 rounded-full blur-2xl group-hover:bg-primary-main/10 transition-smooth"></div>
                            <div className="w-12 h-12 rounded-lg bg-primary-main/10 border border-primary-main/20 flex items-center justify-center mb-6 relative z-10">
                                <MapPin className="w-6 h-6 text-primary-main" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Mapa Interativo</h4>
                            <p className="text-sm text-text-secondary leading-relaxed relative z-10">Explore bairros, descubra valorações locais e visualize os imóveis com precisão cirúrgica em tempo real.</p>
                        </div>
                        {/* Benefit 3 */}
                        <div className="bg-white border border-black/5 rounded-[10px] p-8 hover:bg-gray-50 transition-smooth group relative overflow-hidden flex flex-col items-start text-left shadow-sm">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-main/5 rounded-full blur-2xl group-hover:bg-primary-main/10 transition-smooth"></div>
                            <div className="w-12 h-12 rounded-lg bg-primary-main/10 border border-primary-main/20 flex items-center justify-center mb-6 relative z-10">
                                <Building2 className="w-6 h-6 text-primary-main" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Portfólio Exclusivo</h4>
                            <p className="text-sm text-text-secondary leading-relaxed relative z-10">Acesso antecipado a imóveis de alto padrão e oportunidades de investimento que não estão no mercado aberto.</p>
                        </div>
                        {/* Benefit 4 */}
                        <div className="bg-white border border-black/5 rounded-[10px] p-8 hover:bg-gray-50 transition-smooth group relative overflow-hidden flex flex-col items-start text-left shadow-sm">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-main/5 rounded-full blur-2xl group-hover:bg-primary-main/10 transition-smooth"></div>
                            <div className="w-12 h-12 rounded-lg bg-primary-main/10 border border-primary-main/20 flex items-center justify-center mb-6 relative z-10">
                                <Star className="w-6 h-6 text-primary-main" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Atendimento Premium</h4>
                            <p className="text-sm text-text-secondary leading-relaxed relative z-10">Corretores experientes focados em oferecer consultoria e suporte integral durante toda sua jornada de compra.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties (Now with light backgrounds) */}
            <section className="section-spacing bg-[#F3F4F6]">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-display-2 font-heading text-gray-900 mb-4">
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
            <section className="section-spacing relative overflow-hidden bg-white border-t border-black/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary-main/10 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none" />
                <div className="container-custom text-center">
                    <h2 className="text-display-2 font-heading text-gray-900 mb-4">
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
