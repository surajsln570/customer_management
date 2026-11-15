import ProjectClients from '@/components/projects/ProjectClients'
import { prisma } from '@/lib/prisma'
import { ProjectStatus } from '@prisma/client';
import React from 'react'

export default async function page() {
    const projects = await prisma.project.findMany({
        where: { status: ProjectStatus.ONGOING },
        select: { name: true, id: true, customer: { select: { name: true, id: true } }, type: true, notes: true, projectAmount: true, status: true },
    });
    const customers = await prisma.customer.findMany();
    return (
        <ProjectClients projects={projects} customers={customers} heading='Ongoing Projects' subheading={'Manage Your Ongoing Projects'} />
    )
}
