import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.deleteMany({});

    const titles = new Set<string>();

    while (titles.size < 20) {
      titles.add(faker.commerce.department());
    }

    const createCategoryPromises = Array.from(titles).map((title) =>
      prisma.category.create({
        data: { title },
      }),
    );

    await Promise.all(createCategoryPromises);
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  } finally {
    console.log('Seeding completed!');
    await prisma.$disconnect();
  }
}

main();
