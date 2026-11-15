import { prisma } from "@/lib/prisma";
import { TransactionCategory, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const purchase = await prisma.purchase.create({
            data: {
                amount: Number(body.purchaseAmount),
                products: body.products,
                purchaseDate: new Date(body.purchaseDate),
                customerId: body.customerId || null,
            }
        })

        const transaction = await prisma.transaction.create({
            data: {
                amount: Number(body.amount),
                type: TransactionType.INCOME,
                category: TransactionCategory.JANSEVA,
                description: body.description,
                date: new Date(body.date),
                customerId: body.customerId || null,
                purchaseId: purchase.id,
            }
        })

        return NextResponse.json({ success: true, message: 'Bill created successfully', purchase, transaction })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const purchases = await prisma.purchase.findMany({
            include: {
                customer: { select: { id: true, name: true } },
                transactions: true
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ success: true, data: purchases })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
    }
}