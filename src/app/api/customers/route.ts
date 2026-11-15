import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CustomerType } from '@prisma/client';

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search')?.trim();
    const type = req.nextUrl.searchParams.get('type')?.trim();
    console.log(type, search);

    const customers = await prisma.customer.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { phone: { contains: search } },
            ],
            type: type as CustomerType
        },
        orderBy: { name: 'asc' },
    });

    return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, phone, email, address, type } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const customer = await prisma.customer.create({
            data: {
                name: name.trim(),
                phone: phone?.trim() || null,
                email: email?.trim() || null,
                address: address?.trim() || null,
                type: type?.trim() || null,
            },
        });
        return NextResponse.json(customer, { status: 201 });
    } catch (err: any) {
        if (err.code === 'P2002') {
            return NextResponse.json({ error: 'A customer with this phone number already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}