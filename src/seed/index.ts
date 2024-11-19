import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});

  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

    await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: hashedPassword,
        phone: faker.number.int().toString(),
        role: 'USER',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log(`Users seed completed.`);
    await prisma.$disconnect();
  });
