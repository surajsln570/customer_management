'use client'

import { useMemo, useState } from 'react'
import CustomTable from '@/components/common/CustomTable'
import AddPayment from '@/components/common/AddPayment'
import { getCustomerProjectColumns } from './CustomerProjectColumns'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import Model from '@/components/common/Model'
import { CustomerType, ProjectStatus } from '@prisma/client'
import CreateProject from '@/components/projects/CreateProject'

export default function CustomerProjectsTable({
    customer,
    projects,
}: {
    customer: { id: string; name: string, type: CustomerType }
    projects: any[]
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [editId, setEditId] = useState<string | null>(null)
    const [editProject, setEditProject] = useState<any | null>(null)
    const columns = useMemo(
        () => getCustomerProjectColumns({
            onAdd: setSelectedId, type: customer.type, changeStatus: (id) => changeStatus(id), onEdit: (id) => {
                setEditId(id)
                setEditProject(projects.find((p) => p.id === id))
            }
        }),
        []
    )


    const selected = projects.find((p) => p.id === selectedId) ?? null
    const paid = selected
        ? selected.transactions.reduce((s: number, t: { amount: number }) => s + t.amount, 0)
        : 0
    const remaining = selected ? selected.projectAmount - paid : 0
    const changeStatus = async (id: string) => {
        const project = projects.find((p) => p.id == id)
        const p = await fetch(`/api/project/${project.id}`, {
            headers: {
                'Content-Type': "application/json"
            }
            ,
            method: 'PUT',
            body: JSON.stringify({ status: project.status == ProjectStatus.COMPLETED ? ProjectStatus.ONGOING : ProjectStatus.COMPLETED })
        })
        const result = await p.json();
        window.location.reload()
    }

    return (
        <>
            <CustomTable columns={columns} data={projects} />
            <Model size='md' onClose={() => setSelectedId(null)} title='Add Payment' open={!!selected}>

                {selected && <AddPayment

                    key={selected.id}
                    customer={customer}

                    project={{ id: selected.id, name: selected.name }}
                    remaining={remaining}
                    onClose={() => setSelectedId(null)}
                />}

            </Model>

            {editId && <CreateProject
                open={editId ? true : false}
                customers={[customer]}
                project={{
                    id: editId,
                    name: editProject.name,
                    type: editProject.type,
                    customer: { id: customer.id, name: customer.name },
                    notes: editProject.notes,
                    projectAmount: editProject.projectAmount,
                    status: editProject.status
                }}
                onClose={() => setEditId(null)}
            />}

        </>
    )
}