import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

export default function ConfiguracoesPage() {
    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Configurações
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Gerencie suas preferências
                </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}
                        >
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Perfil</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Suas informações pessoais</p>
                        </div>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium">
                        Editar perfil
                    </button>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center"
                            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}
                        >
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Preferências de alerta</p>
                        </div>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium">
                        Configurar
                    </button>
                </div>

                {/* Security */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"
                            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}
                        >
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Segurança</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Senha e autenticação</p>
                        </div>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium">
                        Alterar senha
                    </button>
                </div>

                {/* Appearance */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}
                        >
                            <Palette className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Aparência</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tema e preferências visuais</p>
                        </div>
                    </div>
                    <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium">
                        Personalizar
                    </button>
                </div>
            </div>
        </div>
    );
}
