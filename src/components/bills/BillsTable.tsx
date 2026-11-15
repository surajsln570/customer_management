'use client'
import CustomTable from '@/components/common/CustomTable'
import { billsColumns } from './bill_columns'

export default function BillsTable({ data }: { data: any[] }) {
    return <CustomTable columns={billsColumns} data={data} />
}