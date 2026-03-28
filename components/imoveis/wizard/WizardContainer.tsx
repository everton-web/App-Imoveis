'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Home, Building2, MapPin, FileText, Image, Loader2 } from 'lucide-react';
import StepIndicator from './StepIndicator';
import Step1Tipologia from './Step1Tipologia';
import Step2Categoria from './Step2Categoria';
import Step3Localizacao from './Step3Localizacao';
import Step4Detalhes from './Step4Detalhes';
import PropertyPreview from './PropertyPreview';

export interface PropertyFormData {
    // Step 1 - Tipologia
    type: 'HOUSE' | 'APARTMENT' | 'CONDO' | 'LAND' | 'COMMERCIAL' | 'FARM';
    purpose: 'RESIDENTIAL' | 'COMMERCIAL';

    // Step 2 - Categoria
    category: 'UNDER_CONSTRUCTION' | 'READY';

    // Step 3 - Localização
    zipCode: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    referencePoint: string;
    latitude: number;
    longitude: number;

    // Step 4 - Detalhes
    title: string;
    description: string;
    price: string;
    area: string;
    bedrooms: string;
    bathrooms: string;
    parkingSpots: string;
    features: string[];

    // Status
    publishStatus: 'DRAFT' | 'PUBLISHED';
}

const initialFormData: PropertyFormData = {
    type: 'HOUSE',
    purpose: 'RESIDENTIAL',
    category: 'READY',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    referencePoint: '',
    latitude: 0,
    longitude: 0,
    title: '',
    description: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpots: '',
    features: [],
    publishStatus: 'DRAFT',
};

const steps = [
    { id: 1, name: 'Tipologia', icon: Home },
    { id: 2, name: 'Categoria', icon: Building2 },
    { id: 3, name: 'Localização', icon: MapPin },
    { id: 4, name: 'Detalhes', icon: FileText },
];

interface WizardContainerProps {
    editingProperty?: PropertyFormData & { id: string };
}

export default function WizardContainer({ editingProperty }: WizardContainerProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<PropertyFormData>(
        editingProperty || initialFormData
    );
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateFormData = (data: Partial<PropertyFormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        // Clear related errors
        const newErrors = { ...errors };
        Object.keys(data).forEach(key => delete newErrors[key]);
        setErrors(newErrors);
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                // Type and purpose are always set
                break;
            case 2:
                // Category is always set
                break;
            case 3:
                if (!formData.zipCode) newErrors.zipCode = 'CEP é obrigatório';
                if (!formData.address) newErrors.address = 'Endereço é obrigatório';
                if (!formData.city) newErrors.city = 'Cidade é obrigatória';
                if (!formData.state) newErrors.state = 'Estado é obrigatório';
                break;
            case 4:
                if (!formData.title) newErrors.title = 'Título é obrigatório';
                if (!formData.description) newErrors.description = 'Descrição é obrigatória';
                if (!formData.price) newErrors.price = 'Preço é obrigatório';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (!validateStep(currentStep)) return;

        setLoading(true);
        try {
            const payload = {
                ...formData,
                publishStatus: status,
                price: parseFloat(formData.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
                area: formData.area ? parseFloat(formData.area) : null,
                bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
                bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
                parkingSpots: formData.parkingSpots ? parseInt(formData.parkingSpots) : null,
                latitude: formData.latitude || -23.5505, // Default São Paulo
                longitude: formData.longitude || -46.6333,
                status: 'AVAILABLE',
            };

            const url = editingProperty
                ? `/api/properties/${(editingProperty as PropertyFormData & { id: string }).id}`
                : '/api/properties';
            const method = editingProperty ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                router.push('/admin/imoveis');
                router.refresh();
            } else {
                const error = await response.json();
                alert(error.error || 'Erro ao salvar imóvel');
            }
        } catch (error) {
            console.error('Erro ao salvar imóvel:', error);
            alert('Erro ao salvar imóvel');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Tipologia formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <Step2Categoria formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <Step3Localizacao formData={formData} updateFormData={updateFormData} errors={errors} />;
            case 4:
                return <Step4Detalhes formData={formData} updateFormData={updateFormData} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left side - Steps */}
                    <div className="lg:w-1/4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Etapas iniciais
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Conclua as etapas iniciais para criar seu imóvel e continuar o cadastro.
                            </p>
                            <StepIndicator steps={steps} currentStep={currentStep} />
                        </div>
                    </div>

                    {/* Center - Form */}
                    <div className="lg:w-1/2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            {renderStep()}

                            {/* Navigation buttons */}
                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentStep === 1}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Voltar
                                </button>

                                <div className="flex items-center gap-3">
                                    {currentStep === steps.length ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleSubmit('DRAFT')}
                                                disabled={loading}
                                                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                                Salvar rascunho
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSubmit('PUBLISHED')}
                                                disabled={loading}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                Publicar imóvel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100"
                                        >
                                            Próximo
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Preview */}
                    <div className="lg:w-1/4">
                        <PropertyPreview formData={formData} currentStep={currentStep} />
                    </div>
                </div>
            </div>
        </div>
    );
}
