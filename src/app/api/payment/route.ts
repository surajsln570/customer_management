import { prisma } from "@/lib/prisma";
import { TransactionCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const res = await prisma.transaction.create({
            data: {
                amount: Number(body.amount),
                customerId: body.customerId,
                projectId: body?.projectId,
                type: body.type,
                category: body.category,
                description: body.description,
            }
        })
        return NextResponse.json({ success: true, message: 'Payment added successfully', res })
    } catch (error) {
        console.log(error)
    }
}

export async function GET(req: NextRequest) {
    try {
        const projectId = req.nextUrl.searchParams.get('project')

        const payments = await prisma.transaction.findMany({
            where: { projectId: projectId },
            include: {
                customer: { select: { id: true, name: true } }
            }
        })
        return NextResponse.json({ success: true, data: payments })
    } catch (error) {
        console.log(error)
    }
}