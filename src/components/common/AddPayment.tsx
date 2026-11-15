'use client'
import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Payment } from '@/types'
import { TransactionCategory, TransactionType } from '@prisma/client'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast, Toast } from '../ui/toast'

export default function AddPayment({ onClose, project, remaining, customer }: { onClose: () => void, remaining: number, project?: { id: string, name: string }, customer?: { id: string, name: string } }) {
    const [form, setForm] = useState({
        amount: remaining,
        description: '',
        type: 'INCOME',
        customerId: '',
        projectId: ''
    })
    const [loading, setLoading] = useState(false);
    const [cust, setCust] = useState([customer])
    const [proj, setProj] = useState([project])
    const handleSave = async () => {
        setLoading(true)
        const res = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...form, category: TransactionCategory.VIDEOEDITING })
        })
        const result = await res.json();
        window.location.reload();
        setLoading(false)
        onClose()
        toast.add({ title: 'saved', description: 'Payment added successfully', type: 'success' })
    }
    useEffect(() => {
        if (project) {
            setForm({ ...form, projectId: project.id, customerId: customer?.id || '' })
        }
    }, [])

    return (
        <form className='w-full flex-col gap-4 flex items-center justify-center'>
            <div className='flex justify-between gap-2 w-full'>
                <Select disabled={customer ? true : false} onValueChange={(value) => setForm({ ...form, customerId: value as TransactionType })}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select Customer' >{form.customerId}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {cust.map((t) => {
                            return <SelectItem key={t?.id} value={t?.id}>{t?.name}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
                <Select disabled={project ? true : false} onValueChange={(value) => setForm({ ...form, projectId: value as TransactionType })}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select Project' >{form.projectId}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {proj.map((t) => {
                            return <SelectItem key={t?.id} value={t?.id}>{t?.name}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex gap-2 w-full'>
                <div className='w-full'>
                    <Label>Amount</Label>
                    <Input max={form.type !== 'INCOME' ? undefined : remaining} type='number' value={form.amount} name='amount' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                </div>
                <div className=''>
                    <Label>Type</Label>
                    <Select onValueChange={(value) => setForm({ ...form, type: value as TransactionType })}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select Type' >{form.type}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {[TransactionType.INCOME, TransactionType.PAYMENT].map((t) => {
                                return <SelectItem key={t} value={t}>{t}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='w-full'>
                <Label>Description</Label>
                <Textarea value={form.description} name='description' onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
            </div>


            <Button disabled={loading || remaining <= 0} variant={'default'} onClick={handleSave}>{remaining <= 0 ? "Already Paid" : loading ? "Saving ..." : 'Save'}</Button>
        </form>
    )
}
