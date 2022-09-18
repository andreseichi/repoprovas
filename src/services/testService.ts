import { find } from "../repositories/categoryRepository";
import { findTeacherDiscipline } from "../repositories/teacherDisciplineRepository";
import { findTestsByTeachers, insert } from "../repositories/testRepository";
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

export async function getTestsByTeacherService() {
  const result = await findTestsByTeachers();

  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Tests not found",
    };
  }

  const teachers = result.map((teacher) => {
    const categories = teacher.TeacherDiscipline.map(
      (teacherDiscipline, index) => {
        const tests = teacherDiscipline.Test.map((test) => {
          return {
            id: test.id,
            name: test.name,
            pdfUrl: test.pdfUrl,
            discipline: {
              id: teacherDiscipline.Discipline.id,
              name: teacherDiscipline.Discipline.name,
            },
          };
        });

        return {
          id: teacherDiscipline.Discipline.id,
          name: teacherDiscipline.Test[0]?.Category.name,
          tests,
        };
      }
    );

    return {
      id: teacher.id,
      name: teacher.name,
      categories,
    };
  });

  return teachers;
}
