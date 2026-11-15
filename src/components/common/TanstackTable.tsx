'use client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
interface DataTableProps<TData> {
    columns: any[],
    data: TData[]
}
export default function TanstackTable<TData>({ columns, data }: DataTableProps<TData>) {

    return (
        <div>

        </div>
    )
}
