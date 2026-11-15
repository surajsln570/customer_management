'use client'
import { Badge } from '@/components/ui/badge'

export const transactionColumns = [
    {
        accessorKey: 'customer.name',
        header: 'Customer',
        cell: ({ row }: any) => row.original.customer?.name ?? '-',
    },
    {
        accessorKey: 'project.name',
        header: 'Project',
        cell: ({ row }: any) => row.original.project?.name ?? '-',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }: any) => `₹${row.original.amount.toLocaleString()}`,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => (
            <Badge variant={row.original.status === 'PAID' ? 'default' : 'destructive'}>
                {row.original.status}
            </Badge>
        ),
    },
]