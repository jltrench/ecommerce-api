import { PrismaClient } from '@prisma/client';
import { users, categories, products } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding... ⚡');

  // Create users
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }

  // Create categories
  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
      },
    });
    console.log(`Created category with id: ${createdCategory.id}`);
  }

  // Create products
  for (const product of products) {
    const { categoryName, ...productData } = product;

    const category = await prisma.category.findUniqueOrThrow({
      where: { name: categoryName },
    });

    const createdProduct = await prisma.product.upsert({
      where: { name: productData.name },
      update: {},
      create: {
        ...productData,
        categoryId: category.id,
      },
    });

    console.log(`Created product with id: ${createdProduct.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
