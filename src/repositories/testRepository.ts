import { prisma } from "../database/prisma";
import { TestInsertData } from "../types/tests";

export async function insert(test: TestInsertData) {
  const result = await prisma.test.create({
    data: test,
  });

  return result;
}

export async function findTestsByTeachers() {
  const result = await prisma.teacher
    .findMany({
      select: {
        id: true,
        name: true,
        TeacherDiscipline: {
          select: {
            Discipline: {
              select: {
                id: true,
                name: true,
              },
            },
            Test: {
              select: {
                id: true,
                name: true,
                pdfUrl: true,
                Category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}
