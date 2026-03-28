'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Download, Search, Building2, Eye, Car, Maximize } from 'lucide-react';

interface DashboardMetrics {
    totalProperties: number;
    availableProperties: number;
    totalViews: number;
    totalRevenue: number;
}

interface Property {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
    bedrooms: number | null;
    bathrooms: number | null;
    parkingSpots: number | null;
    area: number | null;
    type: string;
    status: string;
    publishStatus: string;
    images: { url: string }[];
    owner?: { name: string };
}

const statusLabels: Record<string, { label: string; color: string }> = {
    AVAILABLE: { label: 'Venda', color: 'bg-emerald-100 text-emerald-700' },
    SOLD: { label: 'Vendido', color: 'bg-gray-100 text-gray-600' },
    RENTED: { label: 'Alugado', color: 'bg-blue-100 text-blue-700' },
};

const publishLabels: Record<string, { label: string; color: string }> = {
    PUBLISHED: { label: 'Publicado', color: 'bg-green-100 text-green-700' },
    DRAFT: { label: 'Rascunho', color: 'bg-gray-100 text-gray-600' },
};

function formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
    }).format(value);
}

function formatCompact(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} mi`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)} mil`;
    return value.toString();
}

export default function AdminDashboard() {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [metricsRes, propertiesRes] = await Promise.all([
                    fetch('/api/dashboard/metrics'),
                    fetch('/api/properties?limit=5'),
                ]);

                if (metricsRes.ok) setMetrics(await metricsRes.json());
                if (propertiesRes.ok) {
                    const data = await propertiesRes.json();
                    setProperties(data.properties || data || []);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-6">
            {/* Page Title + Actions */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Visão geral</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Acompanhe suas métricas em tempo real</p>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/admin/imoveis/novo">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                            <Plus className="w-4 h-4" />
                            Novo imóvel
                        </button>
                    </Link>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard
                    label="Imóveis cadastrados"
                    value={loading ? '...' : formatCompact(metrics?.totalProperties || 0)}
                />
                <MetricCard
                    label="Disponíveis"
                    value={loading ? '...' : String(metrics?.availableProperties || 0)}
                />
                <MetricCard
                    label="Visitas"
                    value={loading ? '...' : formatCompact(metrics?.totalViews || 0)}
                />
                <MetricCard
                    label="Vendas"
                    value={loading ? '...' : formatPrice(metrics?.totalRevenue || 0)}
                />
            </div>

            {/* Recent Properties */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-medium text-gray-900">Últimos imóveis</h2>
                    <Link href="/admin/imoveis" className="text-sm text-gray-500 hover:text-gray-700">
                        Ver todos →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                                <div className="h-36 bg-gray-100" />
                                <div className="p-3 space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : properties.length > 0 ? (
                        properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p className="col-span-full text-center py-8 text-gray-500">Nenhum imóvel cadastrado</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function PropertyCard({ property }: { property: Property }) {
    return (
        <Link href={`/admin/imoveis/${property.id}`}>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
                <div className="relative h-36 bg-gray-100">
                    {property.images?.[0] ? (
                        <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-gray-300" />
                        </div>
                    )}
                    <div className="absolute top-2 left-2 flex gap-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusLabels[property.status]?.color}`}>
                            {statusLabels[property.status]?.label}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${publishLabels[property.publishStatus]?.color}`}>
                            {publishLabels[property.publishStatus]?.label}
                        </span>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{property.city}, {property.state}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{formatPrice(property.price)}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        {property.area && <span className="flex items-center gap-1"><Maximize className="w-3 h-3" />{property.area}m²</span>}
                        {property.bedrooms && <span>{property.bedrooms} quartos</span>}
                        {property.parkingSpots && <span className="flex items-center gap-1"><Car className="w-3 h-3" />{property.parkingSpots}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
