import PageHeader from '@/components/common/Header';
import { prisma } from '@/lib/prisma';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import AddProjectToCustomer from '../AddProjectToCustomer';
import Container from '@/components/common/Container';
import Stats from '../Stats';
import CustomTable from '@/components/common/CustomTable';
import { getCustomerProjectColumns } from './CustomerProjectColumns';
import AddPayment from '@/components/common/AddPayment';
import CustomerProjectsTable from './CustomerProjectsTable';
import Section from '@/components/common/Section';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';

export default async function CustomerDetailScreen({ params }: { params: { id: string } }) {
    const id = params.id
    const customer = await prisma.customer.findUnique({
        where: { id: id as string },
        select: {
            id: true,
            name: true,
            address: true,
            phone: true,
            type: true,
            transactions: { select: { createdAt: true, amount: true, project: { select: { name: true, projectAmount: true } } }, orderBy: { createdAt: 'desc' } },
            projects: { select: { id: true, name: true, projectAmount: true, status: true, transactions: { select: { amount: true, } } } }
        }
    })
    const TotalAmount =
        customer?.projects.reduce((sum, p) => sum + p.projectAmount, 0) ?? 0
    const TotalRecieved = customer?.transactions.reduce((sum, p) => sum + p.amount, 0) ?? 0

    const stats = [
        {
            title: 'Total Project',
            amount: customer?.projects.length
        },
        {
            title: 'Completed Project',
            amount: customer?.projects.filter((p) => p.status == 'COMPLETED').length
        },
        {
            title: 'Ongoing Project',
            amount: customer?.projects.filter((p) => p.status == 'ONGOING').length
        },
        {
            title: 'Total Amount',
            amount: TotalAmount
        },
        {
            title: 'Total Recieved',
            amount: TotalRecieved
        },
        {
            title: 'Total Remaining',
            amount: TotalAmount - TotalRecieved
        },
    ]



    return (
        <div>
            <PageHeader header={customer?.name || ''} badge={{ text: customer?.type || '', tone: 'amber' }} subheader={cn('Projects:', customer?.projects.length, ",", 'Mobile:', customer?.phone, "  ",)}>
                <AddProjectToCustomer customerId={customer?.id || ''} />
            </PageHeader>

            <Container>
                <Section>
                    <div className='flex justify-between gap-5'>
                        {
                            stats.map((s, i) => {
                                return <Stats key={i} header={s.title} title={String(s.amount)} />
                            })
                        }
                    </div>
                </Section>
                <Section>
                    <div className='grid grid-cols-8 gap-5'>

                        <div className='col-span-5'>
                            <CustomerProjectsTable customer={{ id: customer?.id || '', name: customer?.name || '', type: customer?.type || 'JANSEVA' }} projects={customer?.projects as any[]} />
                        </div>
                        <div className='col-span-3'>
                            <div className='flex flex-col border-border border border-b-0 pb-0 rounded-lg overflow-auto max-h-[50vh]'>
                                <div className='w-full border-b-1 px-2 text-center font-bold text-lg mx-auto border-b-border flex justify-between'>
                                    Recent Transactions
                                </div>
                                {
                                    customer?.transactions.map((t) => {
                                        return <div key={t.createdAt.toISOString()} className='w-full border-b-1 px-2 rounded-lg border-b-border flex justify-between'>
                                            <div>
                                                <div className='font-bold'>{t.project?.name}</div>
                                                <div className='text-sm text-gray-700'>{t.createdAt.toISOString().split("T")[0]}</div>
                                            </div>
                                            <div className='font-bold'>{t.amount}</div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </Section>
            </Container>
        </div>
    )
}


