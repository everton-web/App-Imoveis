'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    Building2,
    Plus,
    Search,
    Home,
    Store,
    MapPin,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    Loader2,
    Filter
} from 'lucide-react';

interface Property {
    id: string;
    title: string;
    type: string;
    status: string;
    price: number;
    city: string;
    state: string;
    bedrooms?: number;
    area?: number;
    images: { url: string }[];
    createdAt: string;
}

const typeLabels: Record<string, string> = {
    HOUSE: 'Casa',
    APARTMENT: 'Apartamento',
    CONDO: 'Condomínio',
    LAND: 'Terreno',
    COMMERCIAL: 'Comercial',
    FARM: 'Chácara/Sítio',
};

const statusLabels: Record<string, { label: string; color: string }> = {
    AVAILABLE: { label: 'Disponível', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
    SOLD: { label: 'Vendido', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    RENTED: { label: 'Alugado', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
    PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' },
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    }).format(value);
};

export default function ImoveisPage() {
    const { data: session, status } = useSession();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user) {
            fetchProperties();
        }
    }, [session]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/properties');
            if (response.ok) {
                const data = await response.json();
                setProperties(data);
            }
        } catch (error) {
            console.error('Erro ao buscar imóveis:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este imóvel?')) return;

        try {
            const response = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setProperties(properties.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Erro ao excluir imóvel:', error);
        }
        setOpenMenuId(null);
    };

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || property.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (status === 'loading' || loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Imóveis
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie seus imóveis cadastrados
                    </p>
                </div>
                <Link href="/admin/imoveis/novo">
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                        style={{ boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
                    >
                        <Plus className="w-5 h-5" />
                        Novo imóvel
                    </button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar imóveis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['ALL', 'AVAILABLE', 'SOLD', 'RENTED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === status
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {status === 'ALL' ? 'Todos' : statusLabels[status]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {filteredProperties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                        <Building2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Nenhum imóvel cadastrado
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
                        Comece adicionando seu primeiro imóvel.
                    </p>
                    <Link href="/admin/imoveis/novo">
                        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium">
                            <Plus className="w-5 h-5" />
                            Adicionar imóvel
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <div
                            key={property.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-shadow"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                                {property.images[0] ? (
                                    <img
                                        src={property.images[0].url}
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Building2 className="w-12 h-12 text-gray-300" />
                                    </div>
                                )}
                                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium ${statusLabels[property.status]?.color}`}>
                                    {statusLabels[property.status]?.label}
                                </div>
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/imoveis/${property.id}`}>
                                        <button className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm">
                                            <Eye className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </Link>
                                    <Link href={`/admin/imoveis/${property.id}/editar`}>
                                        <button className="p-2 bg-white/90 rounded-lg hover:bg-white shadow-sm">
                                            <Edit className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                                        {property.title}
                                    </h3>
                                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg whitespace-nowrap">
                                        {typeLabels[property.type]}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <MapPin className="w-4 h-4" />
                                    {property.city}, {property.state}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-emerald-600">
                                        {formatCurrency(property.price)}
                                    </span>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        {property.bedrooms && (
                                            <span>{property.bedrooms} quartos</span>
                                        )}
                                        {property.area && (
                                            <span>{property.area}m²</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
