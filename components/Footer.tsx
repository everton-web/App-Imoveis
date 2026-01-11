import Link from 'next/link'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-primary-main text-white mt-section">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-heading font-bold">Pluma</span>
                        </div>
                        <p className="text-white/80 text-sm">
                            Encontre o imóvel dos seus sonhos com a Pluma. Qualidade, confiança e excelência.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/imoveis" className="text-white/80 hover:text-white transition-smooth">
                                    Imóveis
                                </Link>
                            </li>
                            <li>
                                <Link href="/mapa" className="text-white/80 hover:text-white transition-smooth">
                                    Mapa
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-white/80 hover:text-white transition-smooth">
                                    Sobre Nós
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-white/80">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">contato@pluma.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-white/80">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">(11) 9999-9999</span>
                            </li>
                            <li className="flex items-center space-x-2 text-white/80">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">São Paulo, SP</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Newsletter</h3>
                        <p className="text-white/80 text-sm mb-4">
                            Receba novidades sobre imóveis
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                className="flex-1 px-4 py-2 rounded-l-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="px-6 py-2 bg-accent-main rounded-r-full hover:bg-accent-main/90 transition-smooth font-semibold">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
                    <p>&copy; {currentYear} Pluma Imóveis. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
