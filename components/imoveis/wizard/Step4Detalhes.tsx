'use client';

import { PropertyFormData } from './WizardContainer';

interface Step4DetalhesProps {
    formData: PropertyFormData;
    updateFormData: (data: Partial<PropertyFormData>) => void;
    errors: Record<string, string>;
}

const featureOptions = [
    'Piscina',
    'Churrasqueira',
    'Jardim',
    'Varanda',
    'Ar condicionado',
    'Aquecimento',
    'Elevador',
    'Portaria 24h',
    'Academia',
    'Salão de festas',
    'Playground',
    'Quadra esportiva',
];

export default function Step4Detalhes({ formData, updateFormData, errors }: Step4DetalhesProps) {
    const formatCurrency = (value: string) => {
        const digits = value.replace(/\D/g, '');
        const number = parseInt(digits) / 100;
        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const toggleFeature = (feature: string) => {
        const features = formData.features.includes(feature)
            ? formData.features.filter((f) => f !== feature)
            : [...formData.features, feature];
        updateFormData({ features });
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-600 font-semibold">4</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detalhes do imóvel</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Preencha as informações detalhadas do imóvel para atrair mais interessados.
                </p>

                <div className="space-y-4">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Título do anúncio*
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => updateFormData({ title: e.target.value })}
                            placeholder="Ex: Casa moderna com 3 quartos no centro"
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Descrição*
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => updateFormData({ description: e.target.value })}
                            placeholder="Descreva os detalhes e diferenciais do imóvel..."
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {/* Preço */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Preço de venda*
                        </label>
                        <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => updateFormData({ price: formatCurrency(e.target.value) })}
                            placeholder="R$ 0,00"
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                        />
                        {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                    </div>

                    {/* Área, Quartos, Banheiros, Vagas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Área (m²)
                            </label>
                            <input
                                type="number"
                                value={formData.area}
                                onChange={(e) => updateFormData({ area: e.target.value })}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Quartos
                            </label>
                            <input
                                type="number"
                                value={formData.bedrooms}
                                onChange={(e) => updateFormData({ bedrooms: e.target.value })}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Banheiros
                            </label>
                            <input
                                type="number"
                                value={formData.bathrooms}
                                onChange={(e) => updateFormData({ bathrooms: e.target.value })}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Vagas
                            </label>
                            <input
                                type="number"
                                value={formData.parkingSpots}
                                onChange={(e) => updateFormData({ parkingSpots: e.target.value })}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Características */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Características do imóvel
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {featureOptions.map((feature) => {
                                const isSelected = formData.features.includes(feature);
                                return (
                                    <button
                                        key={feature}
                                        type="button"
                                        onClick={() => toggleFeature(feature)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isSelected
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {feature}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
