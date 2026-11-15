
import CustomersClients from "@/components/customers/CustomersClients";
import { prisma } from "@/lib/prisma";
import { CustomerType } from "@prisma/client";

export default async function CustomersPage() {
    const customers = await prisma.customer.findMany({
        where: { type: CustomerType.VIDEOEDITING },
        select: { id: true, name: true, phone: true, createdAt: true, }
    });

    return (
        <CustomersClients type={CustomerType.VIDEOEDITING} customer={customers} />
    );
}