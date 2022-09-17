import { prisma } from "../database/prisma";

export async function find(category: string) {
  const result = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });

  return result;
}
