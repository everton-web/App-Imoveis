'use client';

import { useState, useEffect } from 'react';
import WizardContainer, { PropertyFormData } from '@/components/imoveis/wizard/WizardContainer';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditarImovelPage() {
    const params = useParams();
    const id = params.id as string;
    
    const [propertyData, setPropertyData] = useState<(PropertyFormData & { id: string }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`/api/properties/${id}`);
                if (!res.ok) {
                    throw new Error('Falha ao carregar o imóvel');
                }
                const data = await res.json();
                
                // Extrair apenas o logradouro do endereço consolidado (workaround simples)
                let street = data.address || '';
                if (data.number && street.includes(`, ${data.number}`)) {
                    street = street.replace(`, ${data.number}`, '');
                }
                if (data.complement && street.includes(` - ${data.complement}`)) {
                    street = street.replace(` - ${data.complement}`, '');
                }

                // Map database fields to form data
                const mappedData: PropertyFormData & { id: string } = {
                    id: data.id,
                    type: data.type,
                    purpose: data.purpose || 'RESIDENTIAL',
                    category: data.category || 'READY',
                    zipCode: data.zipCode || '',
                    address: street,
                    number: data.number || '',
                    complement: data.complement || '',
                    neighborhood: data.neighborhood || '',
                    city: data.city || '',
                    state: data.state || '',
                    referencePoint: data.referencePoint || '',
                    latitude: data.latitude || -23.5505,
                    longitude: data.longitude || -46.6333,
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price?.toString() || '',
                    area: data.area?.toString() || '',
                    bedrooms: data.bedrooms?.toString() || '',
                    bathrooms: data.bathrooms?.toString() || '',
                    parkingSpots: data.parkingSpots?.toString() || '',
                    features: data.features || [],
                    publishStatus: data.publishStatus || 'DRAFT',
                };
                
                setPropertyData(mappedData);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar os dados do imóvel. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (error || !propertyData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-red-500 mb-4">{error}</p>
                <Link href="/admin/imoveis">
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Voltar aos imóveis</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/imoveis"
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Editar imóvel
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Atualize as informações do seu anúncio
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wizard for Editing */}
            <WizardContainer editingProperty={propertyData} />
        </div>
    );
}
