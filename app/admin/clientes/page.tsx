'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Plus,
    Search,
    Building2,
    User,
    Phone,
    Mail,
    MoreVertical,
    Trash2,
    Edit,
    Loader2
} from 'lucide-react';
import ClientDrawer from '@/components/clients/ClientDrawer';

interface Contact {
    id: string;
    type: 'PHONE' | 'EMAIL' | 'WHATSAPP';
    value: string;
    label?: string;
    isPrimary: boolean;
}

interface Representative {
    id: string;
    name: string;
    role?: string;
    email?: string;
    phone?: string;
}

interface Client {
    id: string;
    personType: 'INDIVIDUAL' | 'COMPANY';
    name?: string;
    cpf?: string;
    companyName?: string;
    cnpj?: string;
    notes?: string;
    contacts: Contact[];
    representatives: Representative[];
    createdAt: string;
}

export default function ClientsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'ALL' | 'INDIVIDUAL' | 'COMPANY'>('ALL');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user) {
            fetchClients();
        }
    }, [session, filterType, searchTerm]);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filterType !== 'ALL') params.append('personType', filterType);
            if (searchTerm) params.append('search', searchTerm);

            const response = await fetch(`/api/clients?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setClients(data);
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

        try {
            const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setClients(clients.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
        setOpenMenuId(null);
    };

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setIsDrawerOpen(true);
        setOpenMenuId(null);
    };

    const handleAdd = () => {
        setSelectedClient(null);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedClient(null);
    };

    const handleDrawerSave = () => {
        fetchClients();
        handleDrawerClose();
    };

    const getDisplayName = (client: Client) => {
        return client.personType === 'INDIVIDUAL' ? client.name : client.companyName;
    };

    const getDocument = (client: Client) => {
        return client.personType === 'INDIVIDUAL' ? client.cpf : client.cnpj;
    };

    const getPrimaryContact = (client: Client) => {
        return client.contacts.find(c => c.isPrimary) || client.contacts[0];
    };

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
                        Clientes
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie seus clientes
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                    style={{ boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
                >
                    <Plus className="w-5 h-5" />
                    Adicionar cliente
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar clientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType('ALL')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterType === 'ALL'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilterType('INDIVIDUAL')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 ${filterType === 'INDIVIDUAL'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <User className="w-4 h-4" />
                        PF
                    </button>
                    <button
                        onClick={() => setFilterType('COMPANY')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 ${filterType === 'COMPANY'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Building2 className="w-4 h-4" />
                        PJ
                    </button>
                </div>
            </div>

            {/* Content */}
            {clients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Nenhum cliente ainda
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
                        Adicione seu primeiro cliente para começar.
                    </p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar cliente
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Cliente
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tipo
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">
                                    Documento
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                                    Contato
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => {
                                const primaryContact = getPrimaryContact(client);
                                return (
                                    <tr
                                        key={client.id}
                                        className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${client.personType === 'INDIVIDUAL'
                                                        ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                                                        : 'bg-gradient-to-br from-purple-400 to-purple-600'
                                                        }`}
                                                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}
                                                >
                                                    {client.personType === 'INDIVIDUAL' ? (
                                                        <User className="w-5 h-5 text-white" />
                                                    ) : (
                                                        <Building2 className="w-5 h-5 text-white" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {getDisplayName(client)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${client.personType === 'INDIVIDUAL'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                                                }`}>
                                                {client.personType === 'INDIVIDUAL' ? 'PF' : 'PJ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                            {getDocument(client) || '-'}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            {primaryContact ? (
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                    {primaryContact.type === 'EMAIL' ? (
                                                        <Mail className="w-4 h-4" />
                                                    ) : (
                                                        <Phone className="w-4 h-4" />
                                                    )}
                                                    <span className="truncate max-w-[150px]">{primaryContact.value}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === client.id ? null : client.id)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical className="w-5 h-5 text-gray-500" />
                                                </button>
                                                {openMenuId === client.id && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                                                        <button
                                                            onClick={() => handleEdit(client)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(client.id)}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Excluir
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Drawer */}
            <ClientDrawer
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
                onSave={handleDrawerSave}
                client={selectedClient}
            />
        </div>
    );
}
