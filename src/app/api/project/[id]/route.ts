import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await req.json();
    const project = await prisma.project.update({
        where: { id: id },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.type !== undefined && { type: data.type }),
            ...(data.customerId !== undefined && { customerId: data.customerId }),
            ...(data.notes !== undefined && { notes: data.notes }),
            ...(data.projectAmount !== undefined && { projectAmount: Number(data.projectAmount) }),
            ...(data.status !== undefined && { status: data.status }),
        }
    })

    return NextResponse.json({ success: true, message: 'Project updated successfully', data: project })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await prisma.project.delete({
        where: { id },
    })

    return NextResponse.json({ success: true, message: 'Project Deleted Successfully', })

}