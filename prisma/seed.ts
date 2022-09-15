import { prisma } from "../src/database/prisma";
import categoryFactory from "./factories/categoryFactory";
import disciplineFactory from "./factories/disciplineFactory";
import teacherDisciplineFactory from "./factories/teacherDisciplineFactory";
import teacherFactory from "./factories/teacherFactory";
import termFactory from "./factories/termFactory";

async function main() {
  await prisma.term.upsert(termFactory(1));
  await prisma.term.upsert(termFactory(2));
  await prisma.term.upsert(termFactory(3));
  await prisma.term.upsert(termFactory(4));
  await prisma.term.upsert(termFactory(5));
  await prisma.term.upsert(termFactory(6));

  await prisma.category.upsert(categoryFactory("Projeto"));
  await prisma.category.upsert(categoryFactory("Prática"));
  await prisma.category.upsert(categoryFactory("Recuperação"));

  await prisma.teacher.upsert(teacherFactory("Diego Pinho"));
  await prisma.teacher.upsert(teacherFactory("Bruna Hamori"));

  await prisma.discipline.upsert(disciplineFactory("HTML e CSS", 1));
  await prisma.discipline.upsert(disciplineFactory("JavaScript", 2));
  await prisma.discipline.upsert(disciplineFactory("React", 3));
  await prisma.discipline.upsert(disciplineFactory("Humildade", 1));
  await prisma.discipline.upsert(disciplineFactory("Planejamento", 2));
  await prisma.discipline.upsert(disciplineFactory("Autoconfiança", 3));

  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 1));
  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 2));
  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 3));
  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 4));
  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 5));
  await prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 6));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
