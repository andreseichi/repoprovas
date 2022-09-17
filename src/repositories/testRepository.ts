import { prisma } from "../database/prisma";
import { TestInsertData } from "../types/tests";

export async function insert(test: TestInsertData) {
  const result = await prisma.test.create({
    data: test,
  });

  return result;
}
