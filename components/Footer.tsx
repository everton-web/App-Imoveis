import Link from 'next/link'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-white border-t border-black/5 text-black mt-section">
            <div className="container-custom py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold tracking-tight">App Imóveis</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            A evolução na busca pelo imóvel perfeito. Começamos pelo mapa interativo.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/imoveis" className="text-gray-600 hover:text-primary-main transition-smooth">
                                    Imóveis
                                </Link>
                            </li>
                            <li>
                                <Link href="/mapa" className="text-gray-600 hover:text-primary-main transition-smooth">
                                    Mapa
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-gray-600 hover:text-primary-main transition-smooth">
                                    Sobre Nós
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">contato@imoveis.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">(11) 9999-9999</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">São Paulo, SP</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Receba novidades sobre imóveis
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                className="flex-1 px-4 py-2 rounded-l-[10px] bg-white border border-black/10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-main/50"
                            />
                            <button className="px-6 py-2 bg-accent-main text-white rounded-r-[10px] hover:bg-accent-main/90 transition-smooth font-semibold">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-black/10 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} App Imóveis. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
