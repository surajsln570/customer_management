
import CustomersClients from "@/components/customers/CustomersClients";
import { prisma } from "@/lib/prisma";
import { CustomerType } from "@prisma/client";

export default async function CustomersPage() {
    const customers = await prisma.customer.findMany({
        where: { type: CustomerType.JANSEVA },
        select: { id: true, name: true, phone: true, email: true, createdAt: true }
    });


    return (
        <CustomersClients type={CustomerType.JANSEVA} customer={customers} />
    );
}