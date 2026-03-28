'use client';

import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { PropertyFormData } from './WizardContainer';

interface Step3LocalizacaoProps {
    formData: PropertyFormData;
    updateFormData: (data: Partial<PropertyFormData>) => void;
    errors: Record<string, string>;
}

export default function Step3Localizacao({ formData, updateFormData, errors }: Step3LocalizacaoProps) {
    const [loadingCep, setLoadingCep] = useState(false);

    const formatCep = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 8);
        if (digits.length > 5) {
            return `${digits.slice(0, 5)}-${digits.slice(5)}`;
        }
        return digits;
    };

    const handleCepChange = async (value: string) => {
        const formatted = formatCep(value);
        updateFormData({ zipCode: formatted });

        const digits = value.replace(/\D/g, '');
        if (digits.length === 8) {
            setLoadingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    updateFormData({
                        address: data.logradouro || '',
                        neighborhood: data.bairro || '',
                        city: data.localidade || '',
                        state: data.uf || '',
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            } finally {
                setLoadingCep(false);
            }
        }
    };

    const states = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
    ];

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-600 font-semibold">3</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Localização</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Defina o endereço, condomínio caso o imóvel pertença, e detalhes de localização do imóvel.
                </p>

                <div className="space-y-4">
                    {/* CEP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CEP*
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.zipCode}
                                onChange={(e) => handleCepChange(e.target.value)}
                                placeholder="00000-000"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                            />
                            {loadingCep && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 animate-spin" />
                            )}
                        </div>
                        {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Endereço*
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => updateFormData({ address: e.target.value })}
                            placeholder="Informe o endereço do imóvel"
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                        />
                        {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    {/* Número e Complemento */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Número*
                            </label>
                            <input
                                type="text"
                                value={formData.number}
                                onChange={(e) => updateFormData({ number: e.target.value })}
                                placeholder="Nº"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Complemento
                            </label>
                            <input
                                type="text"
                                value={formData.complement}
                                onChange={(e) => updateFormData({ complement: e.target.value })}
                                placeholder="Apto, Bloco, etc"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Bairro */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bairro*
                        </label>
                        <input
                            type="text"
                            value={formData.neighborhood}
                            onChange={(e) => updateFormData({ neighborhood: e.target.value })}
                            placeholder="Informe o bairro do imóvel"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    {/* Estado e Cidade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Estado (UF)*
                            </label>
                            <select
                                value={formData.state}
                                onChange={(e) => updateFormData({ state: e.target.value })}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                <option value="">Selecione</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cidade*
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => updateFormData({ city: e.target.value })}
                                placeholder="Informe a cidade"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                            />
                            {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                        </div>
                    </div>

                    {/* Ponto de referência */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Ponto de referência
                        </label>
                        <input
                            type="text"
                            value={formData.referencePoint}
                            onChange={(e) => updateFormData({ referencePoint: e.target.value })}
                            placeholder="Informe o ponto de referência"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
