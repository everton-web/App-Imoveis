import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
            include: {
                images: {
                    orderBy: { order: 'asc' }
                }
            }
        })

        if (!property) {
            return NextResponse.json(
                { error: 'Imóvel não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(property)
    } catch (error) {
        console.error('Error fetching property:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar detalhes do imóvel' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        if (!title || !description || price === undefined) {
            return NextResponse.json(
                { error: 'Título, descrição e preço são obrigatórios' },
                { status: 400 }
            )
        }

        const property = await prisma.property.update({
            where: { id: params.id },
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
                number: number || null,
                complement: complement || null,
                neighborhood: neighborhood || null,
                city,
                state,
                referencePoint: referencePoint || null,
                latitude: latitude || -23.5505,
                longitude: longitude || -46.6333,
                area: area ? parseFloat(area) : null,
                bedrooms: bedrooms ? parseInt(bedrooms) : null,
                bathrooms: bathrooms ? parseInt(bathrooms) : null,
                parkingSpots: parkingSpots ? parseInt(parkingSpots) : null,
                features: features || [],
                publishedAt: publishStatus === 'PUBLISHED' ? new Date() : null,
            },
            include: {
                images: true,
            },
        })

        return NextResponse.json(property)
    } catch (error) {
        console.error('Error updating property:', error)
        return NextResponse.json(
            { error: 'Erro ao atualizar imóvel' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            )
        }

        await prisma.property.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting property:', error)
        return NextResponse.json(
            { error: 'Erro ao excluir imóvel' },
            { status: 500 }
        )
    }
}
