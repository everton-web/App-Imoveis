import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            )
        }

        const body = await request.json()

        const {
            type,
            purpose,
            category,
            publishStatus,
            title,
            description,
            price,
            zipCode,
            address,
            number,
            complement,
            neighborhood,
            city,
            state,
            referencePoint,
            latitude,
            longitude,
            area,
            bedrooms,
            bathrooms,
            parkingSpots,
            features,
            status,
        } = body

        // Validações
        if (!title || !description || !price) {
            return NextResponse.json(
                { error: 'Título, descrição e preço são obrigatórios' },
                { status: 400 }
            )
        }

        if (!address || !city || !state) {
            return NextResponse.json(
                { error: 'Endereço, cidade e estado são obrigatórios' },
                { status: 400 }
            )
        }

        const property = await prisma.property.create({
            data: {
                type: type || 'HOUSE',
                purpose: purpose || 'RESIDENTIAL',
                category: category || 'READY',
                publishStatus: publishStatus || 'DRAFT',
                status: status || 'AVAILABLE',
                title,
                description,
                price: parseFloat(price) || 0,
                zipCode: zipCode || '',
                address: `${address}${number ? `, ${number}` : ''}${complement ? ` - ${complement}` : ''}`,
                number,
                complement,
                neighborhood,
                city,
                state,
                referencePoint,
                latitude: latitude || -23.5505,
                longitude: longitude || -46.6333,
                area: area ? parseFloat(area) : null,
                bedrooms: bedrooms ? parseInt(bedrooms) : null,
                bathrooms: bathrooms ? parseInt(bathrooms) : null,
                parkingSpots: parkingSpots ? parseInt(parkingSpots) : null,
                features: features || [],
                publishedAt: publishStatus === 'PUBLISHED' ? new Date() : null,
                userId: session.user.id,
            },
            include: {
                images: true,
            },
        })

        return NextResponse.json(property, { status: 201 })
    } catch (error) {
        console.error('Error creating property:', error)
        return NextResponse.json(
            { error: 'Erro ao criar imóvel' },
            { status: 500 }
        )
    }
}
