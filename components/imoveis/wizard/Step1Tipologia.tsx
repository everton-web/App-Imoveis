'use client';

import { Home, Building2, Warehouse, TreePine, Store, Mountain } from 'lucide-react';
import { PropertyFormData } from './WizardContainer';

interface Step1TipologiaProps {
    formData: PropertyFormData;
    updateFormData: (data: Partial<PropertyFormData>) => void;
}

const propertyTypes = [
    { value: 'HOUSE', label: 'Casa', icon: Home },
    { value: 'APARTMENT', label: 'Apartamento', icon: Building2 },
    { value: 'CONDO', label: 'Condomínio', icon: Warehouse },
    { value: 'LAND', label: 'Terreno', icon: Mountain },
    { value: 'COMMERCIAL', label: 'Comercial', icon: Store },
    { value: 'FARM', label: 'Chácara/Sítio', icon: TreePine },
];

const purposes = [
    { value: 'RESIDENTIAL', label: 'Residencial', description: 'Imóvel para moradia' },
    { value: 'COMMERCIAL', label: 'Comercial', description: 'Imóvel para uso comercial' },
];

export default function Step1Tipologia({ formData, updateFormData }: Step1TipologiaProps) {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-600 font-semibold">1</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tipologia*</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    A tipologia define campos e filtros. Após criar o imóvel, este campo não pode mais ser editado.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.type === type.value;
                        return (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => updateFormData({ type: type.value as PropertyFormData['type'] })}
                                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                                <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {type.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium text-emerald-600 mb-2">Qual é a finalidade de uso?</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Selecione o uso predominante do imóvel (conforme matrícula/habite-se se houver).
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {purposes.map((purpose) => {
                        const isSelected = formData.purpose === purpose.value;
                        return (
                            <button
                                key={purpose.value}
                                type="button"
                                onClick={() => updateFormData({ purpose: purpose.value as PropertyFormData['purpose'] })}
                                className={`flex flex-col items-start p-4 rounded-lg border-2 transition-all ${isSelected
                                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {purpose.value === 'RESIDENTIAL' ? (
                                        <Home className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    ) : (
                                        <Store className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                                    )}
                                    <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {purpose.label}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
