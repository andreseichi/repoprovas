import { prisma } from "../database/prisma";

export async function findTeacherDiscipline(
  teacherId: number,
  disciplineId: number
) {
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
