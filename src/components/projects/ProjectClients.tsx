
'use client'
import React, { useEffect, useState } from 'react'
import HeaderButton from '../common/HeaderButton'
import CreateProject from './CreateProject'
import { product, Project } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { Input } from '../ui/input'
import PageHeader from '../common/Header'
import Container from '../common/Container'
import CustomTable from '../common/CustomTable'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function ProjectClients(props: any) {
    const { projects, heading, subheading, customers } = props
    const [createProject, setCreateProject] = useState(false)
    const [editProject, setEditProject] = useState(false)
    const [selectedProject, setselectedProject] = useState<Project | null>(null)
    const [search, setSearch] = useState<string>('');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const router = useRouter();

    const searchProject = async () => {
        const f: Project[] = projects.filter((project: Project) => {
            if (project.name.toLowerCase().includes(search.toLowerCase()) || project.type.toLowerCase().includes(search.toLowerCase()) || project.customer.name.toLowerCase().includes(search.toLowerCase())) {
                return project;
            }
        })
        return f
    }
    const columns = [

        { header: "Name", accessorKey: "name" },
        { header: 'Project Amount', accessorKey: 'projectAmount' },
        { header: "Customer", accessorFn: (row: any) => row.customer.name },
        { header: "Notes", accessorKey: "notes" },
        { header: "Type", accessorKey: "type" },
        {
            header: "Actions", id: 'actions', cell: ({ row }: { row: any }) => (
                <div>
                    <Button variant={'outline'} onClick={() => { setselectedProject(row.original); setEditProject(true) }}>Edit</Button>
                    <Button variant={'destructive'} onClick={() => handleDelete(row.original.id)}>Delete</Button>
                    <Button variant={'outline'} onClick={() => { router.push(`/projects/${row.original.id}`) }}>View</Button>
                </div>
            ),
        }

    ]

    useEffect(() => {
        setTimeout(async () => {
            const p = await searchProject()
            setFilteredProjects(p);
        }, 300)
    }, [search])

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/project/${id}`, {
                method: 'DELETE'
            })
            const result = await res.json();
            console.log(result)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <PageHeader header={heading} subheader={subheading}  >
                <HeaderButton onClick={() => setCreateProject(true)} text='Add Projects' />
            </PageHeader>
            <Container>
                <div className='flex flex-col gap-2'>
                    <Input placeholder='Search Project' type='text' onChange={(e) => setSearch(e.target.value)} />
                    <CustomTable columns={columns} data={filteredProjects} />
                </div>
            </Container>
            {createProject && <CreateProject open={createProject} customers={customers} onClose={() => setCreateProject(false)} />}
            {editProject && <CreateProject open={createProject} customers={customers} project={selectedProject} onClose={() => setEditProject(false)} />}
        </div>
    )
}
