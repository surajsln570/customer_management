'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AddPayment from '../common/AddPayment';
import Model from '../common/Model';
import { Project } from '@/types';
import { headers } from 'next/headers';
import CustomTable from '../common/CustomTable';

export default function ProjectDetailsClients({ project }: { project?: Project }) {
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [remain, setRemain] = useState(0)
    const [total, setTotal] = useState(0);


    const fetchTrans = async () => {
        const res: any = await fetch(`/api/payment?project=${project?.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await res.json();
        remaining(result.data)
        setTransaction(result.data)
    }
    const remaining = (t: any) => {
        const total = totalRecieved(t)
        const r: number = project ? (project.projectAmount - total) : 5
        setRemain(r)
    }
    const totalRecieved = (t: any[]): number => {
        const tl = t.reduce((total, b: any) => {

            return total + Number(b.amount)
        }, 0)
        setTotal(tl);
        return tl
    }

    const columns = [
        {
            header: "Amount",
            accessorKey: "amount",
        },
        {
            header: "Date",
            accessorKey: "date",
        },
        {
            id: 'customerId',
            header: "Customer",
            accessorKey: "customer.name",
        },
    ]

    useEffect(() => {
        const load = async () => {
            await fetchTrans();
        }
        load();
    }, [])
    return (
        <div className='grid min-h-screen grid-cols-12'>
            <div className='col-span-8'>Remaining:{remain} total:{total}</div>
            <div className='col-span-4 relative'>

                <div className='absolute right-0'><Button onClick={() => setShowAddPayment(true)}>Add Payment</Button></div>
                <div className='pt-10'>
                    <CustomTable columns={columns} data={transaction} />
                </div>

            </div>
            {showAddPayment && <Model open={showAddPayment} title='Add Payment' onClose={() => setShowAddPayment(false)}>
                <AddPayment remaining={remain} project={project} customer={project?.customer} onClose={() => setShowAddPayment(false)} />
            </Model>}
        </div>
    )
}
