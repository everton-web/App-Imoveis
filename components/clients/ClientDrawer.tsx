'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, User, Building2, Phone, Mail, MessageCircle, Loader2 } from 'lucide-react';

interface Contact {
    id?: string;
    type: 'PHONE' | 'EMAIL' | 'WHATSAPP';
    value: string;
    label?: string;
    isPrimary: boolean;
}

interface Representative {
    id?: string;
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
}

interface ClientDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    client: Client | null;
}

export default function ClientDrawer({ isOpen, onClose, onSave, client }: ClientDrawerProps) {
    const [loading, setLoading] = useState(false);
    const [personType, setPersonType] = useState<'INDIVIDUAL' | 'COMPANY'>('INDIVIDUAL');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [notes, setNotes] = useState('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [representatives, setRepresentatives] = useState<Representative[]>([]);
    const [expandedSections, setExpandedSections] = useState({
        identification: true,
        contacts: false,
        representatives: false,
    });

    useEffect(() => {
        if (client) {
            setPersonType(client.personType);
            setName(client.name || '');
            setCpf(client.cpf || '');
            setCompanyName(client.companyName || '');
            setCnpj(client.cnpj || '');
            setNotes(client.notes || '');
            setContacts(client.contacts || []);
            setRepresentatives(client.representatives || []);
        } else {
            resetForm();
        }
    }, [client, isOpen]);

    const resetForm = () => {
        setPersonType('INDIVIDUAL');
        setName('');
        setCpf('');
        setCompanyName('');
        setCnpj('');
        setNotes('');
        setContacts([]);
        setRepresentatives([]);
        setExpandedSections({ identification: true, contacts: false, representatives: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                personType,
                name: personType === 'INDIVIDUAL' ? name : undefined,
                cpf: personType === 'INDIVIDUAL' ? cpf : undefined,
                companyName: personType === 'COMPANY' ? companyName : undefined,
                cnpj: personType === 'COMPANY' ? cnpj : undefined,
                notes,
                contacts: contacts.filter(c => c.value),
                representatives: representatives.filter(r => r.name),
            };

            const url = client ? `/api/clients/${client.id}` : '/api/clients';
            const method = client ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                onSave();
            } else {
                const error = await response.json();
                alert(error.error || 'Erro ao salvar cliente');
            }
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente');
        } finally {
            setLoading(false);
        }
    };

    const addContact = () => {
        setContacts([...contacts, { type: 'PHONE', value: '', isPrimary: contacts.length === 0 }]);
    };

    const removeContact = (index: number) => {
        setContacts(contacts.filter((_, i) => i !== index));
    };

    const updateContact = (index: number, field: keyof Contact, value: string | boolean) => {
        const updated = [...contacts];
        updated[index] = { ...updated[index], [field]: value };
        if (field === 'isPrimary' && value === true) {
            updated.forEach((c, i) => {
                if (i !== index) c.isPrimary = false;
            });
        }
        setContacts(updated);
    };

    const addRepresentative = () => {
        setRepresentatives([...representatives, { name: '', role: '' }]);
    };

    const removeRepresentative = (index: number) => {
        setRepresentatives(representatives.filter((_, i) => i !== index));
    };

    const updateRepresentative = (index: number, field: keyof Representative, value: string) => {
        const updated = [...representatives];
        updated[index] = { ...updated[index], [field]: value };
        setRepresentatives(updated);
    };

    const formatCPF = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatCNPJ = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 14);
        return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    };

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 10) {
            return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl z-50 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {client ? 'Editar cliente' : 'Adicionar cliente'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Progress indicator */}
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">1</span>
                            </div>
                            <span>Realize o cadastro básico do cliente (Identificação) para liberar as próximas etapas.</span>
                        </div>

                        {/* Identification Section */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setExpandedSections(s => ({ ...s, identification: !s.identification }))}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50"
                            >
                                <span className="font-medium text-gray-900 dark:text-white">Identificação</span>
                                <span className="text-xs text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400 px-2 py-0.5 rounded">
                                    Pendente
                                </span>
                            </button>

                            {expandedSections.identification && (
                                <div className="p-4 space-y-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Cadastre um novo cliente no sistema preenchendo os dados abaixo.
                                    </p>

                                    {/* Person Type Toggle */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tipo da pessoa
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setPersonType('INDIVIDUAL')}
                                                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${personType === 'INDIVIDUAL'
                                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                                                    }`}
                                            >
                                                <User className="w-5 h-5" />
                                                <span>Pessoa física</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPersonType('COMPANY')}
                                                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${personType === 'COMPANY'
                                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                                                    }`}
                                            >
                                                <Building2 className="w-5 h-5" />
                                                <span>Pessoa jurídica</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Pessoa Física Fields */}
                                    {personType === 'INDIVIDUAL' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Nome completo *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Informe o nome completo"
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    CPF (Opcional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cpf}
                                                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                                                    placeholder="000.000.000-00"
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Pessoa Jurídica Fields */}
                                    {personType === 'COMPANY' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Razão social *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    placeholder="Informe a razão social"
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    CNPJ (Opcional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cnpj}
                                                    onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                                                    placeholder="00.000.000/0000-00"
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Observações (Opcional)
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Observações adicionais..."
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Representatives Section (only for COMPANY) */}
                        {personType === 'COMPANY' && (
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setExpandedSections(s => ({ ...s, representatives: !s.representatives }))}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white">Representantes</span>
                                    <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                                        {representatives.length}
                                    </span>
                                </button>

                                {expandedSections.representatives && (
                                    <div className="p-4 space-y-4">
                                        {representatives.map((rep, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Representante {index + 1}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRepresentative(index)}
                                                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={rep.name}
                                                    onChange={(e) => updateRepresentative(index, 'name', e.target.value)}
                                                    placeholder="Nome do representante"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={rep.role || ''}
                                                        onChange={(e) => updateRepresentative(index, 'role', e.target.value)}
                                                        placeholder="Cargo"
                                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={rep.phone || ''}
                                                        onChange={(e) => updateRepresentative(index, 'phone', formatPhone(e.target.value))}
                                                        placeholder="Telefone"
                                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                    />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={rep.email || ''}
                                                    onChange={(e) => updateRepresentative(index, 'email', e.target.value)}
                                                    placeholder="E-mail"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addRepresentative}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Adicionar representante
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Contacts Section */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setExpandedSections(s => ({ ...s, contacts: !s.contacts }))}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50"
                            >
                                <span className="font-medium text-gray-900 dark:text-white">Contatos</span>
                                <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                                    {contacts.length}
                                </span>
                            </button>

                            {expandedSections.contacts && (
                                <div className="p-4 space-y-4">
                                    {contacts.map((contact, index) => (
                                        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={contact.type}
                                                        onChange={(e) => updateContact(index, 'type', e.target.value)}
                                                        className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                    >
                                                        <option value="PHONE">Telefone</option>
                                                        <option value="WHATSAPP">WhatsApp</option>
                                                        <option value="EMAIL">E-mail</option>
                                                    </select>
                                                    <label className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <input
                                                            type="checkbox"
                                                            checked={contact.isPrimary}
                                                            onChange={(e) => updateContact(index, 'isPrimary', e.target.checked)}
                                                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        Principal
                                                    </label>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeContact(index)}
                                                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-lg">
                                                    {contact.type === 'PHONE' && <Phone className="w-5 h-5 text-gray-500" />}
                                                    {contact.type === 'WHATSAPP' && <MessageCircle className="w-5 h-5 text-green-500" />}
                                                    {contact.type === 'EMAIL' && <Mail className="w-5 h-5 text-blue-500" />}
                                                </div>
                                                <input
                                                    type={contact.type === 'EMAIL' ? 'email' : 'text'}
                                                    value={contact.value}
                                                    onChange={(e) => updateContact(index, 'value',
                                                        contact.type !== 'EMAIL' ? formatPhone(e.target.value) : e.target.value
                                                    )}
                                                    placeholder={contact.type === 'EMAIL' ? 'email@exemplo.com' : '(00) 00000-0000'}
                                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={contact.label || ''}
                                                onChange={(e) => updateContact(index, 'label', e.target.value)}
                                                placeholder="Rótulo (ex: Celular, Comercial)"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addContact}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Adicionar contato
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5" />
                                {client ? 'Salvar alterações' : 'Adicionar'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
