import { find } from "../repositories/categoryRepository";
import { findTeacherDiscipline } from "../repositories/teacherDisciplineRepository";
import { insert } from "../repositories/testRepository";
import { TestData } from "../types/tests";

export async function createTestService(test: TestData) {
  const category = await find(test.category);
  if (!category) {
    throw {
      type: "NOT_FOUND",
      message: "Category not found",
    };
  }

  const teacherDiscipline = await findTeacherDiscipline(
    test.teacherId,
    test.disciplineId
  );
  if (!teacherDiscipline) {
    throw {
      type: "NOT_FOUND",
      message: "Teacher or Discipline not found",
    };
  }

  const testInsertData = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id,
  };

  const result = await insert(testInsertData);

  return result;
}
