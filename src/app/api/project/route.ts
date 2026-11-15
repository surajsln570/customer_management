import { addProject } from "@/lib/gst-ledger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const projects = await prisma.project.findMany({
        include: { customer: true }
    });
    return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log('project', data)
    const project = await addProject(data)
    return NextResponse.json(project);
}