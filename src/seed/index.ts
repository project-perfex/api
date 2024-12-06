import {
  PrismaClient,
  OpportunityStatus as PrismaOpportunityStatus,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

enum OpportunityStatus {
  Open = 'OPEN',
  InProgress = 'INPROGRESS',
  Closed = 'CLOSED',
  OnHold = 'ONHOLD',
}

async function deleteExistingData() {
  await prisma.category.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.opportunity.deleteMany({});
}

function generateUniqueTitles(count: number): Set<string> {
  const titles = new Set<string>();
  while (titles.size < count) {
    titles.add(faker.commerce.department());
  }
  return titles;
}

async function createCategories(titles: Set<string>) {
  const createCategoryPromises = Array.from(titles).map((title) =>
    prisma.category.create({
      data: { title },
    }),
  );
  return await Promise.all(createCategoryPromises);
}

async function createProducts(categories: any[]) {
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
}

async function createCustomers(count: number) {
  const createCustomerPromises = Array.from({ length: count }).map(() =>
    prisma.customer.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
      },
    }),
  );
  return await Promise.all(createCustomerPromises);
}

function getRandomStatus(): OpportunityStatus {
  const statuses = [
    OpportunityStatus.Open,
    OpportunityStatus.InProgress,
    OpportunityStatus.Closed,
    OpportunityStatus.OnHold,
  ];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

async function createOpportunities(customers: any[]) {
  const createOpportunityPromises = customers.map((customer) =>
    prisma.opportunity.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
        status: getRandomStatus() as unknown as PrismaOpportunityStatus,
        customerId: customer.id,
      },
    }),
  );
  await Promise.all(createOpportunityPromises);
}

async function main() {
  try {
    await deleteExistingData();

    const titles = generateUniqueTitles(20);
    const categories = await createCategories(titles);
    await createProducts(categories);

    const customers = await createCustomers(20);
    await createOpportunities(customers);

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
