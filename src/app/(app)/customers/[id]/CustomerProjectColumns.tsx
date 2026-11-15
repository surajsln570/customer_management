'use client'

import { Button } from '@/components/ui/button'
import { CustomerType, ProjectStatus } from '@prisma/client'
import { boolean } from 'zod'

const getPaid = (row: any): number =>
    row.original.transactions.reduce((sum: number, t: { amount: number }) => sum + t.amount, 0)

type props = {
    onAdd: (projectId: string) => void,
    type: CustomerType,
    changeStatus: (projectId: string) => void
    onEdit: (projectId: string) => void
}

export const getCustomerProjectColumns = ({
    onAdd,
    changeStatus,
    type,
    onEdit
}: props): any[] => [
    { accessorKey: 'name', header: type == CustomerType.JANSEVA ? "Products" : 'Project Name' },
    { accessorKey: 'projectAmount', header: 'Amount' },
    type == CustomerType.VIDEOEDITING && {
        header: 'Project Status', id: 'status', cell: ({ row }: { row: any }) => {
            return <Button onClick={() => changeStatus(row.original.id)} variant={row.original.status == ProjectStatus.COMPLETED ? 'secondary' : 'destructive'}>
                {row.original.status == ProjectStatus.COMPLETED ? ProjectStatus.COMPLETED.toLowerCase() : ProjectStatus.ONGOING.toLowerCase()}
            </Button>
        }
    },
    {
        id: 'paymentStatus',
        header: 'Payment Status',
        cell: ({ row }: { row: any }) => {
            const paid = getPaid(row)
            const total = row.original.projectAmount
            return (
                <div>
                    {paid === 0
                        ? 'unpaid'
                        : paid < total
                            ? `partial (remaining: ${total - paid})`
                            : 'paid'}
                </div>
            )
        },
    },
    {
        id: 'addPayment',
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
            <div className='flex gap-1'>
                <Button
                    variant="secondary"
                    disabled={getPaid(row) >= row.original.projectAmount}
                    onClick={() => onAdd(row.original.id)}
                >
                    Add Payment
                </Button>
                <Button
                    variant="secondary"
                    disabled={getPaid(row) >= row.original.projectAmount}
                    onClick={() => onEdit(row.original.id)}
                >
                    edit
                </Button>
            </div>
        ),
    },
].filter((col): col is Exclude<typeof col, false> => Boolean(col)) 