export const billsColumns = [
    { header: "Products", accessorKey: "products" },
    { header: "Amount", accessorKey: "amount", cell: ({ row }: { row: any }) => `₹${row.original.amount}` },
    { header: "Paid Amount", accessorKey: "paidAmount", cell: ({ row }: { row: any }) => `₹${row.original.paidAmount}` },
    { header: "Purchase Date", accessorKey: "purchaseDate", cell: ({ row }: { row: any }) => new Date(row.original.purchaseDate).toLocaleDateString() },
    { header: "Customer", accessorKey: "customerId", cell: ({ row }: { row: any }) => row.original.customerId ?? "—" },
    { header: "Created At", accessorKey: "createdAt", cell: ({ row }: { row: any }) => new Date(row.original.createdAt).toLocaleDateString() },
]