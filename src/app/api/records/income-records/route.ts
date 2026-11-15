import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const startParam = searchParams.get('startDate');
    const endParam = searchParams.get('endDate');

    if (!startParam || !endParam) {
        return NextResponse.json(
            { success: false, message: 'Start and End date are required' },
            { status: 400 }
        );
    }

    const start = new Date(startParam);
    const end = new Date(endParam);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json(
            { success: false, message: 'Invalid date format' },
            { status: 400 }
        );
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const dateFilter = { gte: start, lte: end };

    try {
        const [projectAgg, incomeAgg, paymentAgg, expenseAgg] = await Promise.all([
            prisma.project.aggregate({
                _sum: { projectAmount: true },
                where: { date: dateFilter },
            }),
            prisma.transaction.aggregate({
                _sum: { amount: true },
                where: { type: 'INCOME', status: 'PAID', date: dateFilter },
            }),
            prisma.transaction.aggregate({
                _sum: { amount: true },
                where: { type: 'PAYMENT', status: 'PAID', date: dateFilter },
            }),
            prisma.expense.aggregate({
                _sum: { amount: true },
                where: { date: dateFilter },
            }),
        ]);

        const totalIncome = Number(projectAgg._sum.projectAmount ?? 0);
        const incomeReceived = Number(incomeAgg._sum.amount ?? 0);
        const payments = Number(paymentAgg._sum.amount ?? 0);
        const expenses = Number(expenseAgg._sum.amount ?? 0);

        const totalExpense = expenses + payments;
        return NextResponse.json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                totalIncomeReceived: incomeReceived,
                netEarningReceived: incomeReceived - totalExpense,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}