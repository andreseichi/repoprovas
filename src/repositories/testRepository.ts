import { prisma } from "../database/prisma";
import { TestInsertData } from "../types/tests";

export async function find(teacherId: number, disciplineId: number) {
  const result = await prisma.teacherDiscipline.findUnique({
    where: {
      teacherId_disciplineId: {
        teacherId,
        disciplineId,
      },
    },
  });

  return result;
}

export async function insert(test: TestInsertData) {
  const result = await prisma.test.create({
    data: test,
  });

  return result;
}
