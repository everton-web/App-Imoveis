import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

interface RouteParams {
    params: { id: string };
}

// GET - Buscar cliente por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const client = await prisma.client.findFirst({
            where: {
                id: params.id,
                userId: session.user.id,
            },
            include: {
                contacts: true,
                representatives: true,
            },
        });

        if (!client) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }

        return NextResponse.json(client);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
    }
}

// PUT - Atualizar cliente
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        // Verificar se o cliente pertence ao usuário
        const existingClient = await prisma.client.findFirst({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingClient) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }

        const body = await request.json();
        const { personType, name, cpf, companyName, cnpj, notes, contacts, representatives } = body;

        // Atualizar cliente em uma transação
        const client = await prisma.$transaction(async (tx) => {
            // Deletar contatos e representantes existentes
            await tx.contact.deleteMany({ where: { clientId: params.id } });
            await tx.representative.deleteMany({ where: { clientId: params.id } });

            // Atualizar cliente com novos dados
            return tx.client.update({
                where: { id: params.id },
                data: {
                    personType,
                    name: personType === 'INDIVIDUAL' ? name : null,
                    cpf: personType === 'INDIVIDUAL' ? cpf : null,
                    companyName: personType === 'COMPANY' ? companyName : null,
                    cnpj: personType === 'COMPANY' ? cnpj : null,
                    notes,
                    contacts: contacts?.length ? {
                        create: contacts.map((c: { type: string; value: string; label?: string; isPrimary?: boolean }) => ({
                            type: c.type,
                            value: c.value,
                            label: c.label,
                            isPrimary: c.isPrimary || false,
                        })),
                    } : undefined,
                    representatives: representatives?.length ? {
                        create: representatives.map((r: { name: string; role?: string; email?: string; phone?: string }) => ({
                            name: r.name,
                            role: r.role,
                            email: r.email,
                            phone: r.phone,
                        })),
                    } : undefined,
                },
                include: {
                    contacts: true,
                    representatives: true,
                },
            });
        });

        return NextResponse.json(client);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
    }
}

// DELETE - Excluir cliente
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        // Verificar se o cliente pertence ao usuário
        const existingClient = await prisma.client.findFirst({
            where: {
                id: params.id,
                userId: session.user.id,
            },
        });

        if (!existingClient) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }

        await prisma.client.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        return NextResponse.json({ error: 'Erro ao excluir cliente' }, { status: 500 });
    }
}
