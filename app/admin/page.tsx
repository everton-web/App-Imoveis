import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Building2, Users, LayoutDashboard, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getStats() {
    try {
        const [totalProperties, availableProperties, totalUsers] = await Promise.all([
            prisma.property.count(),
            prisma.property.count({ where: { status: 'AVAILABLE' } }),
            prisma.user.count(),
        ])

        return {
            totalProperties,
            availableProperties,
            totalUsers,
        }
    } catch (error) {
        return {
            totalProperties: 0,
            availableProperties: 0,
            totalUsers: 0,
        }
    }
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    const stats = await getStats()

    return (
        <div className="min-h-screen bg-background-subtle dark:bg-gray-950">
            {/* Header */}
            <div className="bg-primary-main text-white py-8">
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-display-2 font-heading mb-2">
                                Dashboard Administrativo
                            </h1>
                            <p className="text-white/90">
                                Bem-vindo, {session.user.name}
                            </p>
                        </div>
                        <Link href="/">
                            <Button variant="secondary">
                                Voltar ao Site
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-text-secondary text-sm mb-1">Total de Imóveis</p>
                                    <p className="text-4xl font-bold text-primary-main">{stats.totalProperties}</p>
                                </div>
                                <div className="w-16 h-16 bg-primary-main/10 rounded-full flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-primary-main" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-text-secondary text-sm mb-1">Imóveis Disponíveis</p>
                                    <p className="text-4xl font-bold text-accent-signal">{stats.availableProperties}</p>
                                </div>
                                <div className="w-16 h-16 bg-accent-signal/10 rounded-full flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-accent-signal" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-text-secondary text-sm mb-1">Usuários</p>
                                    <p className="text-4xl font-bold text-accent-main">{stats.totalUsers}</p>
                                </div>
                                <div className="w-16 h-16 bg-accent-main/10 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-accent-main" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/admin/imoveis/novo">
                                <Button className="w-full" size="lg">
                                    <Building2 className="w-5 h-5 mr-2" />
                                    Adicionar Novo Imóvel
                                </Button>
                            </Link>
                            <Link href="/admin/imoveis">
                                <Button variant="secondary" className="w-full" size="lg">
                                    <LayoutDashboard className="w-5 h-5 mr-2" />
                                    Gerenciar Imóveis
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* User Info */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Informações do Usuário</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-2">
                            <p><strong>Nome:</strong> {session.user.name}</p>
                            <p><strong>Email:</strong> {session.user.email}</p>
                            <p><strong>Role:</strong> <span className="px-3 py-1 bg-primary-main text-white rounded-full text-sm">{session.user.role}</span></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
