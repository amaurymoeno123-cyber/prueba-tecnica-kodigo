import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const agents = [
    { name: 'Alice Support', email: 'alice@kodigo.com' },
    { name: 'Bob Tech', email: 'bob@kodigo.com' },
    { name: 'Charlie Ops', email: 'charlie@kodigo.com' },
  ];

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { email: agent.email },
      update: {},
      create: agent,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
