import ProjectClients from '@/components/projects/ProjectClients'
import { getCustomers } from '@/lib/gst-ledger';
import { prisma } from '@/lib/prisma'
import { ProjectStatus } from '@prisma/client';
import React from 'react'

export default async function page() {
    const projects = await prisma.project.findMany({
        where: { status: ProjectStatus.COMPLETED },
        select: { name: true, id: true, customer: { select: { name: true, id: true } }, type: true, notes: true, projectAmount: true, status: true },

    });
    const customers = await prisma.customer.findMany();
    return (
        <ProjectClients customers={customers} projects={projects} heading='Completed Projects' subheading={'See Your Completed Projects'} />
    )
}
