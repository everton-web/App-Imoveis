import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const properties = await prisma.property.findMany({
            where: {
                status: 'AVAILABLE',
            },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(properties)
    } catch (error) {
        console.error('Error fetching properties:', error)
        return NextResponse.json(
            { error: 'Failed to fetch properties' },
            { status: 500 }
        )
    }
}
