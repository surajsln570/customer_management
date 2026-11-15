'use client'
import Container from '@/components/common/Container'
import CustomTable from '@/components/common/CustomTable'
import PageHeader from '@/components/common/Header'
import HeaderButton from '@/components/common/HeaderButton'
import Model from '@/components/common/Model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Expense } from '@/types'
import React, { useEffect, useState } from 'react'
import AddExpense from './AddExpense'

export default function ExpenseClient(props: any) {
    const { expenses, heading, subheading } = props
    const [createExpense, setCreateExpense] = useState(false)
    const [editExpense, setEditExpense] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
    const [search, setSearch] = useState('')
    const [filteredExpenses, setFilteredExpenses] = useState(expenses)

    const searchExpense = () => {
        return expenses.filter((e: Expense) =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            (e.category ?? '').toLowerCase().includes(search.toLowerCase())
        )
    }

    useEffect(() => {
        const t = setTimeout(() => setFilteredExpenses(searchExpense()), 300)
        return () => clearTimeout(t)
    }, [search])

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/expense/${id}`, { method: 'DELETE' })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        { header: 'Title', accessorKey: 'title' },
        { header: 'Category', accessorKey: 'category' },
        { header: 'Amount', accessorKey: 'amount' },
        { header: 'Date', accessorFn: (row: any) => new Date(row.date).toLocaleDateString() },
        { header: 'Description', accessorKey: 'description' },
        {
            header: 'Actions', id: 'actions', cell: ({ row }: { row: any }) => (
                <div>
                    <Button variant={'outline'} onClick={() => { setSelectedExpense(row.original); setEditExpense(true) }}>Edit</Button>
                    <Button variant={'destructive'} onClick={() => handleDelete(row.original.id)}>Delete</Button>
                </div>
            ),
        }
    ]

    return (
        <div>
            <PageHeader header={heading} subheader={subheading}>
                <HeaderButton onClick={() => setCreateExpense(true)} text='Add Expense' />
            </PageHeader>
            <Container>
                <div className='flex flex-col gap-2'>
                    <Input placeholder='Search Expense' type='text' onChange={(e) => setSearch(e.target.value)} />
                    <CustomTable columns={columns} data={filteredExpenses} />
                </div>
            </Container>
            {createExpense && (
                <Model open={createExpense} title='Create Expense' onClose={() => setCreateExpense(false)} size='md'>
                    <AddExpense onClose={() => setCreateExpense(false)} />
                </Model>
            )}
            {editExpense && (
                <Model open={editExpense} title='Edit Expense' onClose={() => setEditExpense(false)} size='md'>
                    <AddExpense expense={selectedExpense} onClose={() => setEditExpense(false)} />
                </Model>
            )}
        </div>
    )
}