import { find } from "../repositories/categoryRepository";
import { findTeacherDiscipline } from "../repositories/teacherDisciplineRepository";
import {
  findTestsByDiscipline,
  findTestsByTeachers,
  insert,
} from "../repositories/testRepository";
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

export async function getTestsByDisciplineService() {
  const result = await findTestsByDiscipline();
  if (!result) {
    throw {
      type: "NOT_FOUND",
      message: "Tests not found",
    };
  }

  const testsFiltered = result.map((term) => {
    const disciplines = term.Discipline.map((discipline) => {
      const categories = discipline.TeacherDiscipline.map((category, index) => {
        const tests = category.Test.map((test) => {
          return {
            id: test.id,
            name: test.name,
            pdfUrl: test.pdfUrl,
            category: {
              id: test.Category.id,
              name: test.Category.name,
            },
          };
        });

        return {
          id: tests[index]?.category.id,
          name: tests[index]?.category.name,
          tests,
        };
      });

      return {
        id: discipline.id,
        name: discipline.name,
        categories,
      };
    });

    return {
      id: term.id,
      number: term.number,
      disciplines,
    };
  });

  return testsFiltered;
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
          id: teacherDiscipline.Test[index]?.Category.id,
          name: teacherDiscipline.Test[index]?.Category.name,
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
