import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json()
    const expense = await prisma.expense.update({
        where: { id: params.id },
        data: {
            title: body.title,
            amount: Number(body.amount),
            category: body.category || null,
            description: body.description || null,
            date: new Date(body.date),
        },
    })
    return NextResponse.json(expense)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.expense.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
}