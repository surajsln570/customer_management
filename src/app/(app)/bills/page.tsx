
import BillPageHeader from '@/components/bills/BillPageHeader'

import Container from '@/components/common/Container'
import { prisma } from '@/lib/prisma'
import React from 'react'
import CustomTable from '@/components/common/CustomTable'
import { billsColumns } from '@/components/bills/bill_columns'
import BillsTable from '@/components/bills/BillsTable'


export default async function BillPage() {
    const bills = await prisma.purchase.findMany({
        include: {
            customer: { select: { id: true, name: true } },
            transactions: true
        },
        orderBy: { createdAt: 'desc' }
    })
    const serialized = bills.map(b => ({
        ...b,
        paidAmount: b.transactions.reduce((sum, t) => sum + t.amount, 0),
        purchaseDate: b.purchaseDate.toISOString(),
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
    }))

    return (
        <div>
            <BillPageHeader />
            <Container>
                <BillsTable data={serialized} />
            </Container>


        </div>
    )
}
