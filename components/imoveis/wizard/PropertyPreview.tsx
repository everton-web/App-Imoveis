'use client';

import { Home, Building2, MapPin, Bed, Bath, Car, Maximize } from 'lucide-react';
import { PropertyFormData } from './WizardContainer';

interface PropertyPreviewProps {
    formData: PropertyFormData;
    currentStep: number;
}

const typeLabels: Record<string, string> = {
    HOUSE: 'Casa',
    APARTMENT: 'Apartamento',
    CONDO: 'Condomínio',
    LAND: 'Terreno',
    COMMERCIAL: 'Comercial',
    FARM: 'Chácara/Sítio',
};

const purposeLabels: Record<string, string> = {
    RESIDENTIAL: 'Residencial',
    COMMERCIAL: 'Comercial',
};

const categoryLabels: Record<string, string> = {
    UNDER_CONSTRUCTION: 'Na Planta',
    READY: 'Pronto',
};

export default function PropertyPreview({ formData, currentStep }: PropertyPreviewProps) {
    const hasBasicInfo = formData.type && formData.purpose;
    const hasLocation = formData.city && formData.state;
    const hasDetails = formData.title || formData.price;

    if (currentStep < 3 && !hasLocation && !hasDetails) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Preview do seu imóvel e anúncio
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                        <Home className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete as etapas iniciais para desbloquear o preview do seu imóvel e anúncio.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-8">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Preview do anúncio
                </h3>
            </div>

            {/* Card Preview */}
            <div className="p-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <Home className="w-12 h-12 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded">
                                Venda
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                                {purposeLabels[formData.purpose]}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium rounded">
                                {categoryLabels[formData.category]}
                            </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {formData.title || `${typeLabels[formData.type]} ${formData.purpose === 'RESIDENTIAL' ? 'residencial' : 'comercial'}`}
                        </h4>

                        {/* Location */}
                        {hasLocation && (
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <MapPin className="w-4 h-4" />
                                <span>
                                    {formData.neighborhood ? `${formData.neighborhood}, ` : ''}
                                    {formData.city} - {formData.state}
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        {formData.price && (
                            <p className="text-lg font-bold text-emerald-600 mb-3">
                                {formData.price}
                            </p>
                        )}

                        {/* Details */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                            {formData.area && (
                                <div className="flex items-center gap-1">
                                    <Maximize className="w-4 h-4" />
                                    <span>{formData.area}m²</span>
                                </div>
                            )}
                            {formData.bedrooms && (
                                <div className="flex items-center gap-1">
                                    <Bed className="w-4 h-4" />
                                    <span>{formData.bedrooms}</span>
                                </div>
                            )}
                            {formData.bathrooms && (
                                <div className="flex items-center gap-1">
                                    <Bath className="w-4 h-4" />
                                    <span>{formData.bathrooms}</span>
                                </div>
                            )}
                            {formData.parkingSpots && (
                                <div className="flex items-center gap-1">
                                    <Car className="w-4 h-4" />
                                    <span>{formData.parkingSpots}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
