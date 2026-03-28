import { Globe, Settings } from 'lucide-react';

export default function SitePage() {
    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Meu Site
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Configure seu site de imóveis
                </p>
            </div>

            {/* Coming Soon */}
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6"
                    style={{ boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                >
                    <Globe className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Em breve
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                    Aqui você poderá configurar seu site personalizado com seus imóveis,
                    personalizar cores, logo e muito mais.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">Domínio próprio</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2">
                            <Settings className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">Personalização</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-2">
                            <Globe className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">SEO otimizado</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
