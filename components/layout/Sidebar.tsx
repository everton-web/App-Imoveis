'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    Home,
    Users,
    Globe,
    Settings,
    LogOut,
    Building2,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Sites', href: '/admin/site', icon: Globe },
];

const operationNavItems: NavItem[] = [
    { label: 'Imóveis', href: '/admin/imoveis', icon: Home },
    { label: 'Clientes', href: '/admin/clientes', icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    const NavLink = ({ item }: { item: NavItem }) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
            <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
          transition-colors duration-150
          ${active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
        `}
            >
                <Icon className={`w-5 h-5 ${active ? 'text-gray-900' : 'text-gray-400'}`} strokeWidth={1.5} />
                <span>{item.label}</span>
            </Link>
        );
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="p-4 border-b border-gray-100">
                <Link href="/admin" className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    <span className="text-lg font-semibold text-gray-900">Imóveis</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-6">
                <div className="space-y-1">
                    {mainNavItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </div>

                <div>
                    <p className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Operação
                    </p>
                    <div className="space-y-1">
                        {operationNavItems.map((item) => (
                            <NavLink key={item.href} item={item} />
                        ))}
                    </div>
                </div>
            </nav>

            {/* Bottom */}
            <div className="p-3 border-t border-gray-100 space-y-1">
                <NavLink item={{ label: 'Configurações', href: '/admin/configuracoes', icon: Settings }} />

                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                    <LogOut className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    <span>Sair</span>
                </button>
            </div>

            {/* User */}
            <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {session?.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {session?.user?.name || 'Usuário'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {session?.user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
            >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-[60]"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-[70] w-60 bg-white
          lg:translate-x-0 lg:z-50
          transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-1.5 rounded text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <SidebarContent />
            </aside>
        </>
    );
}
