'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Expense } from '@/types'
import { toast } from '@/components/ui/toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function AddExpense({ onClose, expense }: { onClose: () => void, expense?: Expense | null }) {
    const router = useRouter()
    const [form, setForm] = useState({
        title: expense?.title ?? '',
        amount: expense?.amount ?? '',
        category: expense?.category ?? '',
        description: expense?.description ?? '',
        date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    })
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        if (!form.title || !form.amount) {
            toast.add({ title: 'error', description: 'Title and amount are required', type: 'error' })
            return
        }
        setLoading(true)
        const res = await fetch(expense ? `/api/expense/${expense.id}` : '/api/expense', {
            method: expense ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        setLoading(false)
        if (!res.ok) {
            toast.add({ title: 'error', description: 'Failed to save expense', type: 'error' })
            return
        }
        router.refresh()
        onClose()
        toast.add({ title: 'saved', description: 'Expense saved successfully', type: 'success' })
    }

    return (
        <form className='w-full flex-col gap-4 flex items-center justify-center'>
            <div className='w-full'>
                <Label>Title</Label>
                <Input value={form.title} name='title' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
            </div>
            <div className='flex gap-2 w-full'>
                <div className='w-full'>
                    <Label>Amount</Label>
                    <Input type='number' value={form.amount} name='amount' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                </div>
                <div className='w-full'>
                    <Label>Category</Label>
                    <Input value={form.category} name='category' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                </div>
                <div className='w-full'>
                    <Label>Date</Label>
                    <Input type='date' value={form.date} name='date' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                </div>
            </div>
            <div className='w-full'>
                <Label>Description</Label>
                <Textarea value={form.description} name='description' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
            </div>

            <Button type='button' disabled={loading} variant={'default'} onClick={handleSave}>{loading ? "Saving ..." : 'Save'}</Button>
        </form>
    )
}