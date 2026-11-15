
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RollerCoaster } from 'lucide-react';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      id: crypto.randomUUID(),
      username: 'admin',
      passwordHash,
      fullName: 'Sarvesh Chauhan',
      role: Role.ADMIN,
      updatedAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });