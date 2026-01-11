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
        <nav className="sticky top-0 z-50 w-full border-b border-border-light dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-glass">
            <div className="container-custom">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-main to-accent-main rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                            <span className="text-white font-heading font-bold text-xl">P</span>
                        </div>
                        <span className="text-xl font-heading font-bold text-primary-main">
                            Pluma
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
                                            ? 'bg-primary-main text-white'
                                            : 'text-text-secondary hover:bg-secondary-light dark:hover:bg-secondary-dark hover:text-primary-main'
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
                        <ThemeToggle />

                        {session ? (
                            <Link href="/admin">
                                <Button variant="primary" size="sm">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button variant="primary" size="sm">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Entrar
                                </Button>
                            </Link>
                        )}
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
                                        ? 'text-primary-main'
                                        : 'text-text-muted hover:text-primary-main'
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
