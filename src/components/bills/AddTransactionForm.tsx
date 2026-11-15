'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

import { TransactionCategory } from '@prisma/client'
import { toast } from '../ui/toast'

export default function AddTransactionForm({ onClose }: { onClose: () => void }) {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        products: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        purchaseAmount: '',
        amount: '',
        description: '',
        customerId: '',
        date: new Date().toISOString().split('T')[0],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        setLoading(true)
        const res = await fetch('/api/bills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                type: 'INCOME',
                category: TransactionCategory.JANSEVA,
            })
        })
        const result = await res.json()
        console.log('result', result)
        if (res.ok) {
            toast.add({ title: 'Saved', description: 'Transaction created successfully', type: 'success' })
            window.location.reload()
            onClose()
        } else {
            toast.add({ title: 'Error', description: result.message || 'Something went wrong', type: 'error' })
        }
        setLoading(false)
    }

    return (
        <form className='w-full flex flex-col gap-4'>
            <div className='w-full'>
                <Label>Products</Label>
                <Textarea name='products' value={form.products} onChange={handleChange} />
            </div>
            <div className='flex gap-2 w-full'>
                <div className='w-full'>
                    <Label>Purchase Date</Label>
                    <Input type='date' name='purchaseDate' value={form.purchaseDate} onChange={handleChange} />
                </div>
                <div className='w-full'>
                    <Label>Purchase Amount</Label>
                    <Input type='number' name='purchaseAmount' value={form.purchaseAmount} onChange={handleChange} />
                </div>
            </div>
            <div className='flex gap-2 w-full'>
                <div className='w-full'>
                    <Label>Transaction Amount</Label>
                    <Input type='number' name='amount' value={form.amount} onChange={handleChange} />
                </div>
                <div className='w-full'>
                    <Label>Transaction Date</Label>
                    <Input type='date' name='date' value={form.date} onChange={handleChange} />
                </div>
            </div>
            <div className='w-full'>
                <Label>Customer ID (optional)</Label>
                <Input name='customerId' value={form.customerId} onChange={handleChange} />
            </div>
            <div className='w-full'>
                <Label>Description</Label>
                <Textarea name='description' value={form.description} onChange={handleChange} />
            </div>
            <Button disabled={loading} onClick={handleSave}>
                {loading ? 'Saving...' : 'Save'}
            </Button>
        </form>
    )
}