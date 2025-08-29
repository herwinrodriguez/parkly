import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: Role.ADMIN,
    },
  });

  const operator = await prisma.user.upsert({
    where: { email: 'operator@example.com' },
    update: {},
    create: {
      email: 'operator@example.com',
      name: 'Operator',
      role: Role.OPERATOR,
    },
  });

  const rate = await prisma.rate.upsert({
    where: { name: 'Base Rate' },
    update: {},
    create: {
      name: 'Base Rate',
      price: 10.0,
    },
  });

  console.log({ admin, operator, rate });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
