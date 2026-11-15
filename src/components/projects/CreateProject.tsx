'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Model from '../common/Model'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

import { addProject, getCustomers } from '@/lib/gst-ledger'
import { Project } from '@/types'
import { cn } from '@/lib/utils'
import { ProjectStatus } from '@prisma/client'
type props = {
    onClose: () => void
    customers?: any[]
    project?: Project | null
    open: boolean
}
export default function CreateProject({ onClose, open, customers, project }: props) {

    const [form, setForm] = useState({
        name: '',
        type: '',
        projectAmount: 0,
        customerId: '',
        notes: '',
        status: 'ONGOING'
    })

    const getName = (id: string) => {
        const c: any = customers?.find((c: any) => c.id == id)
        return c.name
    }
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let p: any;
        if (project) {
            p = await fetch(`/api/project/${project.id}`, {
                headers: {
                    'Content-Type': "application/json"
                }
                ,
                method: 'PUT',
                body: JSON.stringify(form)
            })
        } else {
            p = await fetch(cn('/api/project',), {
                headers: {
                    'Content-Type': "application/json"
                }
                ,
                method: 'POST',
                body: JSON.stringify(form)
            })
        }
        const pr = await p.json();
        console.log(pr)
        onClose()
        window.location.reload()
    }
    useEffect(() => {
        if (project) {
            setForm({
                name: project.name,
                type: project.type,
                customerId: project.customer.id,
                notes: project.notes,
                projectAmount: project.projectAmount,
                status: project.status
            })
        }
    }, [])
    return (
        <Model open={open} title={'Create Project'} onClose={onClose} size='md'>
            <form className='flex flex-col gap-5'>
                <Select
                    disabled={customers ? customers.length < 2 : false}
                    value={form.customerId}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            customerId: value || ''
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Customer" >{form.customerId && getName(form.customerId)}</SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {customers && customers.map((customer: any) => (
                            <SelectItem
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={form.status}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            status: value || ProjectStatus.ONGOING
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" >{form.status}</SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {[ProjectStatus.ONGOING, ProjectStatus.COMPLETED].map((customer: any) => (
                            <SelectItem
                                key={customer}
                                value={customer}
                            >
                                {customer}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div>
                    <Label>Project Name</Label>
                    <Input value={form.name} name='name' onChange={handleChange} />
                </div>
                <div>
                    <Label>Type</Label>
                    <Input value={form.type} name='type' onChange={handleChange} />
                </div>
                <div>
                    <Label>Project Amount</Label>
                    <Input value={form.projectAmount} name='projectAmount' type='number' onChange={handleChange} />
                </div>
                <div >
                    <Label>Notes</Label>
                    <Input value={form.notes} name='notes' onChange={handleChange} />
                </div>
                <Button onClick={(e) => handleSubmit(e)}>{project ? 'update' : 'Create'}</Button>

            </form>
        </Model>
    )
}
