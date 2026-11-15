
import { prisma } from '@/lib/prisma'
import React from 'react'
import ExpenseClient from './ExpenseClient'

export default async function page() {
    const expenses = await prisma.expense.findMany({
        orderBy: { date: 'desc' },
    })
    return (
        <ExpenseClient expenses={expenses} heading='Expenses' subheading='Manage your business expenses' />
    )
}