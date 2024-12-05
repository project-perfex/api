import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.deleteMany({});
    await prisma.product.deleteMany({});

    const titles = new Set<string>();

    while (titles.size < 20) {
      titles.add(faker.commerce.department());
    }

    const createCategoryPromises = Array.from(titles).map((title) =>
      prisma.category.create({
        data: { title },
      }),
    );

    const categories = await Promise.all(createCategoryPromises);

    const createProductPromises = categories.map((category) =>
      prisma.product.create({
        data: {
          title: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          description: faker.commerce.productDescription(),
          categoryId: category.id,
        },
      }),
    );

    await Promise.all(createProductPromises);

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
