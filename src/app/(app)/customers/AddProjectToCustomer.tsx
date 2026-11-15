'use client'
import HeaderButton from '@/components/common/HeaderButton'
import Model from '@/components/common/Model'
import CreateProject from '@/components/projects/CreateProject'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Customer } from '@/types'
import { ProjectStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddProjectToCustomer({ customerId }: { customerId: any }) {
    const router = useRouter();
    const [showModel, setShowModel] = useState(false)
    const [form, setForm] = useState({
        name: '',
        type: '',
        projectAmount: 0,
        customerId: customerId,
        notes: '',
        status: 'ONGOING'
    })
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let p: any;

        p = await fetch(cn('/api/project',), {
            headers: {
                'Content-Type': "application/json"
            }
            ,
            method: 'POST',
            body: JSON.stringify(form)
        })

        const pr = await p.json();
        console.log(pr)
        setShowModel(false)
        router.refresh()
    }
    return (
        <div>
            <HeaderButton onClick={() => setShowModel(true)} text='Add Project'></HeaderButton>
            {showModel && <Model open={showModel} title={'Create Project'} onClose={() => setShowModel(false)} size='md'>
                <form className='flex flex-col gap-5'>

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
                    <Button onClick={(e) => handleSubmit(e)}>{'Create'}</Button>

                </form>
            </Model>}

        </div>
    )
}
