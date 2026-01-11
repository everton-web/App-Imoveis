import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@pluma.com' },
        update: {},
        create: {
            email: 'admin@pluma.com',
            name: 'Administrador',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created:', admin.email)

    // Create sample properties
    const properties = [
        {
            title: 'Casa Moderna em Condomínio Fechado',
            description: 'Linda casa moderna com 3 quartos, piscina e área gourmet. Localizada em condomínio fechado de alto padrão com segurança 24h.',
            price: 850000,
            type: 'HOUSE',
            status: 'AVAILABLE',
            address: 'Rua das Palmeiras, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            latitude: -23.5505,
            longitude: -46.6333,
            bedrooms: 3,
            bathrooms: 3,
            area: 250,
            parkingSpots: 2,
            features: ['Piscina', 'Área Gourmet', 'Jardim', 'Segurança 24h'],
            featured: true,
            userId: admin.id,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
                        alt: 'Fachada da casa',
                        order: 0,
                    },
                    {
                        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
                        alt: 'Sala de estar',
                        order: 1,
                    },
                ],
            },
        },
        {
            title: 'Apartamento Luxuoso Vista Mar',
            description: 'Apartamento de alto padrão com vista panorâmica para o mar. 4 suítes, varanda gourmet e 3 vagas de garagem.',
            price: 1200000,
            type: 'APARTMENT',
            status: 'AVAILABLE',
            address: 'Av. Atlântica, 456',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22021-001',
            latitude: -22.9068,
            longitude: -43.1729,
            bedrooms: 4,
            bathrooms: 5,
            area: 180,
            parkingSpots: 3,
            features: ['Vista Mar', 'Varanda Gourmet', 'Academia', 'Piscina'],
            featured: true,
            userId: admin.id,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
                        alt: 'Vista do apartamento',
                        order: 0,
                    },
                ],
            },
        },
        {
            title: 'Cobertura Duplex Centro',
            description: 'Cobertura duplex no centro da cidade com terraço privativo e churrasqueira.',
            price: 950000,
            type: 'APARTMENT',
            status: 'AVAILABLE',
            address: 'Rua XV de Novembro, 789',
            city: 'Curitiba',
            state: 'PR',
            zipCode: '80020-310',
            latitude: -25.4284,
            longitude: -49.2733,
            bedrooms: 3,
            bathrooms: 3,
            area: 200,
            parkingSpots: 2,
            features: ['Terraço', 'Churrasqueira', 'Vista Panorâmica'],
            featured: false,
            userId: admin.id,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                        alt: 'Cobertura',
                        order: 0,
                    },
                ],
            },
        },
        {
            title: 'Terreno Comercial Esquina',
            description: 'Excelente terreno comercial em esquina movimentada, ideal para construção de prédio comercial.',
            price: 450000,
            type: 'LAND',
            status: 'AVAILABLE',
            address: 'Av. Paulista, 1000',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            latitude: -23.5613,
            longitude: -46.6565,
            area: 500,
            features: ['Esquina', 'Comercial', 'Localização Privilegiada'],
            featured: false,
            userId: admin.id,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
                        alt: 'Terreno',
                        order: 0,
                    },
                ],
            },
        },
    ]

    for (const property of properties) {
        await prisma.property.create({
            data: property,
        })
    }

    console.log('✅ Sample properties created')
    console.log('🎉 Seed completed successfully!')
    console.log('\n📧 Login credentials:')
    console.log('   Email: admin@pluma.com')
    console.log('   Password: admin123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
