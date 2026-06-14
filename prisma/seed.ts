import { prisma } from '../config/db.js';

async function main() {
  const defaultRoles = ['Admin', 'Developer', 'User'];

  console.log('🚀 Start seeding database...');

  for (const roleName of defaultRoles) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {}, // If it exists, do nothing
      create: { name: roleName }, // If it doesn't, create it
    });
    console.log(`✅ Role checked/created: ${role.name} (ID: ${role.id})`);
  }

  console.log('🎉 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
