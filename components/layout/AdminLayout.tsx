'use client';

import { SessionProvider } from 'next-auth/react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <SessionProvider>
            <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <main className="lg:pl-60 min-h-screen">
                    {children}
                </main>
            </div>
        </SessionProvider>
    );
}
