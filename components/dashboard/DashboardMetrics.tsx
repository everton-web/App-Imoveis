'use client';

import { useEffect, useState } from 'react';
import {
    Building2,
    Users,
    UserPlus,
    TrendingUp,
    DollarSign,
    Home,
    Store,
    Calendar,
    Loader2
} from 'lucide-react';

interface Metrics {
    properties: {
        total: number;
        available: number;
        sold: number;
        rented: number;
        recentCount: number;
        totalValue: number;
        byType: { name: string; value: number }[];
        byPurpose: { name: string; value: number }[];
    };
    clients: {
        total: number;
        individual: number;
        company: number;
    };
    users: {
        total: number;
    };
}

const formatCurrency = (value: number) => {
    if (value >= 1000000) {
        return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value.toFixed(0)}`;
};

export default function DashboardMetrics() {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('/api/dashboard/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error('Erro ao carregar métricas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
        );
    }

    if (!metrics) {
        return (
            <div className="text-center py-12 text-gray-500">
                Erro ao carregar métricas
            </div>
        );
    }

    const totalTypes = metrics.properties.byType.reduce((acc, item) => acc + item.value, 0) || 1;
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

    return (
        <div className="space-y-8">
            {/* KPI Cards Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Properties */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total de Imóveis</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.properties.total}</p>
                            <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                +{metrics.properties.recentCount} este mês
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <Building2 className="w-7 h-7 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Available Properties */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Disponíveis</p>
                            <p className="text-3xl font-bold text-emerald-600">{metrics.properties.available}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                                <div
                                    className="bg-emerald-600 h-1.5 rounded-full transition-all"
                                    style={{ width: `${(metrics.properties.available / (metrics.properties.total || 1)) * 100}%` }}
                                />
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                            <Home className="w-7 h-7 text-emerald-600" />
                        </div>
                    </div>
                </div>

                {/* Total Value */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Valor Anunciado</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(metrics.properties.totalValue)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">em imóveis disponíveis</p>
                        </div>
                        <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-7 h-7 text-yellow-600" />
                        </div>
                    </div>
                </div>

                {/* Total Clients */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total de Clientes</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.clients.total}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {metrics.clients.individual} PF · {metrics.clients.company} PJ
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                            <UserPlus className="w-7 h-7 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Properties by Type Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Imóveis por Tipo
                    </h3>

                    {metrics.properties.byType.length > 0 ? (
                        <div className="space-y-4">
                            {metrics.properties.byType.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-4">
                                    <div className="w-24 text-sm text-gray-600 dark:text-gray-300 truncate">
                                        {item.name}
                                    </div>
                                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                                        <div
                                            className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{
                                                width: `${Math.max((item.value / totalTypes) * 100, 10)}%`,
                                                backgroundColor: colors[index % colors.length],
                                            }}
                                        >
                                            <span className="text-white text-sm font-medium">{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <Building2 className="w-12 h-12 mb-3" />
                            <p>Nenhum imóvel cadastrado</p>
                        </div>
                    )}
                </div>

                {/* Properties by Purpose + Status */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                        Resumo de Status
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Available */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Home className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-2xl font-bold text-emerald-600">{metrics.properties.available}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Disponíveis</p>
                        </div>

                        {/* Sold */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{metrics.properties.sold}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Vendidos</p>
                        </div>

                        {/* Rented */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Store className="w-6 h-6 text-purple-600" />
                            </div>
                            <p className="text-2xl font-bold text-purple-600">{metrics.properties.rented}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Alugados</p>
                        </div>

                        {/* This Month */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Calendar className="w-6 h-6 text-yellow-600" />
                            </div>
                            <p className="text-2xl font-bold text-yellow-600">{metrics.properties.recentCount}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Este mês</p>
                        </div>
                    </div>

                    {/* Purpose breakdown */}
                    {metrics.properties.byPurpose.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Por finalidade</p>
                            <div className="flex gap-4">
                                {metrics.properties.byPurpose.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.name === 'Residencial' ? 'bg-emerald-500' : 'bg-blue-500'
                                            }`} />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.name}: <strong>{item.value}</strong>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Clients breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Distribuição de Clientes
                    </h3>
                    <span className="text-sm text-gray-500">Total: {metrics.clients.total}</span>
                </div>

                {metrics.clients.total > 0 ? (
                    <div className="flex items-center gap-8">
                        {/* Visual bar */}
                        <div className="flex-1 h-12 rounded-lg overflow-hidden flex">
                            <div
                                className="bg-emerald-500 flex items-center justify-center text-white text-sm font-medium transition-all"
                                style={{ width: `${(metrics.clients.individual / metrics.clients.total) * 100}%` }}
                            >
                                {metrics.clients.individual > 0 && `${metrics.clients.individual} PF`}
                            </div>
                            <div
                                className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium transition-all"
                                style={{ width: `${(metrics.clients.company / metrics.clients.total) * 100}%` }}
                            >
                                {metrics.clients.company > 0 && `${metrics.clients.company} PJ`}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-500 rounded" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Pessoa Física</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Pessoa Jurídica</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <Users className="w-12 h-12 mb-3" />
                        <p>Nenhum cliente cadastrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}
