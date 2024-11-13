import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await Promise.all([
    await prisma.user.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); //<shirt, categoryID>

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imageDb = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imageDb,
    });
  });

  console.log("Ejecutado correctamente");
}

(() => {
  main();
})();
