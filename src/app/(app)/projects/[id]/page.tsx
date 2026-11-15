import Container from '@/components/common/Container'
import DetailsPageHeader from '@/components/common/DetailsPageHeader'
import ProjectDetailsClients from '@/components/projects/ProjectDetailsClients'
import { prisma } from '@/lib/prisma';
import { Project } from '@/types';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique(
        {
            where: { id }
            ,
            include: {
                customer: { select: { id: true, name: true } }
            }
        }
    )
    if (!project) return <div></div>
    const p: Project = {
        customer: project.customer,
        id: project.id,
        name: project.name,
        type: project.type || '',
        notes: project.notes || '',
        projectAmount: project.projectAmount,
        status: project.status
    }
    return (
        <div>
            <DetailsPageHeader title={project?.name || ''} subTitle={String(project?.projectAmount) || "0"} />
            <Container>
                <ProjectDetailsClients project={p
                } />
            </Container>
        </div>
    )
}
