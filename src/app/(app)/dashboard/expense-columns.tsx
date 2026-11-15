'use client'
export const expenseColumns = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'category', header: 'Category' },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }: any) => `₹${row.original.amount.toLocaleString()}`,
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }: any) => row.original.date.toString().split('GMT')[0].slice(3, 50),
    },
]