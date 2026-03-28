import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            )
        }

        // Get all metrics in parallel
        const [
            totalProperties,
            availableProperties,
            soldProperties,
            rentedProperties,
            totalClients,
            individualClients,
            companyClients,
            totalUsers,
            propertiesByType,
            propertiesByPurpose,
            recentProperties,
            totalValue,
        ] = await Promise.all([
            // Total properties
            prisma.property.count(),
            // Available properties
            prisma.property.count({ where: { status: 'AVAILABLE' } }),
            // Sold properties
            prisma.property.count({ where: { status: 'SOLD' } }),
            // Rented properties
            prisma.property.count({ where: { status: 'RENTED' } }),
            // Total clients
            prisma.client.count(),
            // Individual clients (PF)
            prisma.client.count({ where: { personType: 'INDIVIDUAL' } }),
            // Company clients (PJ)
            prisma.client.count({ where: { personType: 'COMPANY' } }),
            // Total users
            prisma.user.count(),
            // Properties by type
            prisma.property.groupBy({
                by: ['type'],
                _count: { type: true },
            }),
            // Properties by purpose
            prisma.property.groupBy({
                by: ['purpose'],
                _count: { purpose: true },
            }),
            // Recent properties (last 30 days)
            prisma.property.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    },
                },
            }),
            // Total value of available properties
            prisma.property.aggregate({
                where: { status: 'AVAILABLE' },
                _sum: { price: true },
            }),
        ])

        // Format properties by type for chart
        const typeLabels: Record<string, string> = {
            HOUSE: 'Casa',
            APARTMENT: 'Apartamento',
            CONDO: 'Condomínio',
            LAND: 'Terreno',
            COMMERCIAL: 'Comercial',
            FARM: 'Chácara/Sítio',
        }

        const typeData = propertiesByType.map((item) => ({
            name: typeLabels[item.type] || item.type,
            value: item._count.type,
        }))

        // Format properties by purpose for chart
        const purposeLabels: Record<string, string> = {
            RESIDENTIAL: 'Residencial',
            COMMERCIAL: 'Comercial',
        }

        const purposeData = propertiesByPurpose.map((item) => ({
            name: purposeLabels[item.purpose] || item.purpose,
            value: item._count.purpose,
        }))

        return NextResponse.json({
            properties: {
                total: totalProperties,
                available: availableProperties,
                sold: soldProperties,
                rented: rentedProperties,
                recentCount: recentProperties,
                totalValue: totalValue._sum.price?.toNumber() || 0,
                byType: typeData,
                byPurpose: purposeData,
            },
            clients: {
                total: totalClients,
                individual: individualClients,
                company: companyClients,
            },
            users: {
                total: totalUsers,
            },
        })
    } catch (error) {
        console.error('Error fetching metrics:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar métricas' },
            { status: 500 }
        )
    }
}
