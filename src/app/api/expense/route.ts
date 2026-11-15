import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    const expenses = await prisma.expense.findMany({ orderBy: { date: 'desc' } })
    return NextResponse.json(expenses)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const expense = await prisma.expense.create({
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