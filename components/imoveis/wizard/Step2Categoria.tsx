'use client';

import { Building2, Home, HardHat } from 'lucide-react';
import { PropertyFormData } from './WizardContainer';

interface Step2CategoriaProps {
    formData: PropertyFormData;
    updateFormData: (data: Partial<PropertyFormData>) => void;
}

const categories = [
    {
        value: 'UNDER_CONSTRUCTION',
        label: 'Imóvel na Planta',
        description: 'Ainda em obra ou em fase de lançamento.',
        icon: HardHat,
    },
    {
        value: 'READY',
        label: 'Imóvel Pronto',
        description: 'Já entregue e pronto para morar ou investir.',
        icon: Home,
    },
];

export default function Step2Categoria({ formData, updateFormData }: Step2CategoriaProps) {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-600 font-semibold">2</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categoria do anúncio*</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Defina se o anúncio é de um lançamento (na planta/em obras) ou de um imóvel pronto para visita.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = formData.category === category.value;
                        return (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => updateFormData({ category: category.value as PropertyFormData['category'] })}
                                className={`flex flex-col items-start p-6 rounded-lg border-2 transition-all text-left ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isSelected ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-gray-100 dark:bg-gray-700'
                                    }`}>
                                    <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                                </div>
                                <span className={`text-base font-medium mb-1 ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                                    }`}>
                                    {category.label}
                                </span>
                                <span className={`text-sm ${isSelected ? 'text-emerald-600 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {category.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
