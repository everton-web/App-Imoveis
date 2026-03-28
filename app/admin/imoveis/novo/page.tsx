import WizardContainer from '@/components/imoveis/wizard/WizardContainer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NovoImovelPage() {
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
                                Novo imóvel
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Complete as etapas para criar seu anúncio
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wizard */}
            <WizardContainer />
        </div>
    );
}
