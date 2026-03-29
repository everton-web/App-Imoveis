'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/Button'
import { Home, Map, Building2, LogIn, LayoutDashboard } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function Navbar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    const navLinks = [
        { href: '/', label: 'Início', icon: Home },
        { href: '/imoveis', label: 'Imóveis', icon: Building2 },
        { href: '/mapa', label: 'Mapa', icon: Map },
    ]

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-glass shadow-medium">
            <div className="px-4 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-primary-main/10 rounded-full flex items-center justify-center group-hover:bg-primary-main/20 transition-smooth border border-primary-main/20">
                            <Building2 className="w-5 h-5 text-primary-main" />
                        </div>
                        <span className="text-xl font-heading font-bold text-white tracking-tight">
                            App Imóveis
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-smooth ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">{link.label}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-3">
                        {session ? (
                            <Link href="/admin">
                                <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:bg-white/10">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button variant="secondary" size="sm" className="hidden md:flex bg-white/10 text-white hover:bg-white/20 border-white/10">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Entrar
                                </Button>
                            </Link>
                        )}
                        <Button variant="primary" size="sm" className="hidden md:flex rounded-full">
                            Agendar Demo
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center justify-around py-3 border-t border-border-light dark:border-gray-800">
                    {navLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${isActive
                                    ? 'text-white'
                                    : 'text-text-muted hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{link.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
