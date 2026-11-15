
import { prisma } from './prisma';





export async function getCustomers() {
    const customers = await prisma.customer.findMany();
    console.log(customers)
    return customers;
}
export async function addProject(data: any) {
    const project = await prisma.project.create({
        data: {
            name: data.name,
            type: data.type,
            customerId: data.customerId,
            notes: data.notes,
            projectAmount: Number(data.projectAmount),
        }
    });
    return project;
}