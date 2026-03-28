import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET - Listar todos os clientes do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const personType = searchParams.get('personType');
    const search = searchParams.get('search');

    const clients = await prisma.client.findMany({
      where: {
        userId: session.user.id,
        ...(personType && { personType: personType as 'INDIVIDUAL' | 'COMPANY' }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
            { cpf: { contains: search } },
            { cnpj: { contains: search } },
          ],
        }),
      },
      include: {
        contacts: true,
        representatives: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

// POST - Criar novo cliente
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { personType, name, cpf, companyName, cnpj, notes, contacts, representatives } = body;

    // Validação básica
    if (!personType) {
      return NextResponse.json({ error: 'Tipo de pessoa é obrigatório' }, { status: 400 });
    }

    if (personType === 'INDIVIDUAL' && !name) {
      return NextResponse.json({ error: 'Nome é obrigatório para pessoa física' }, { status: 400 });
    }

    if (personType === 'COMPANY' && !companyName) {
      return NextResponse.json({ error: 'Razão social é obrigatória para pessoa jurídica' }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        personType,
        name: personType === 'INDIVIDUAL' ? name : null,
        cpf: personType === 'INDIVIDUAL' ? cpf : null,
        companyName: personType === 'COMPANY' ? companyName : null,
        cnpj: personType === 'COMPANY' ? cnpj : null,
        notes,
        userId: session.user.id,
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

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}
