import { prisma } from "../src/database/prisma";
import categoryFactory from "./factories/categoryFactory";
import disciplineFactory from "./factories/disciplineFactory";
import teacherDisciplineFactory from "./factories/teacherDisciplineFactory";
import teacherFactory from "./factories/teacherFactory";
import termFactory from "./factories/termFactory";

async function main() {
  await Promise.all([
    prisma.term.upsert(termFactory(1)),
    prisma.term.upsert(termFactory(2)),
    prisma.term.upsert(termFactory(3)),
    prisma.term.upsert(termFactory(4)),
    prisma.term.upsert(termFactory(5)),
    prisma.term.upsert(termFactory(6)),
  ]);

  await Promise.all([
    prisma.category.upsert(categoryFactory("Projeto")),
    prisma.category.upsert(categoryFactory("Prática")),
    prisma.category.upsert(categoryFactory("Recuperação")),
  ]);

  await Promise.all([
    prisma.teacher.upsert(teacherFactory("Diego Pinho")),
    prisma.teacher.upsert(teacherFactory("Bruna Hamori")),
  ]);

  await Promise.all([
    prisma.discipline.upsert(disciplineFactory("HTML e CSS", 1)),
    prisma.discipline.upsert(disciplineFactory("JavaScript", 2)),
    prisma.discipline.upsert(disciplineFactory("React", 3)),
    prisma.discipline.upsert(disciplineFactory("Humildade", 1)),
    prisma.discipline.upsert(disciplineFactory("Planejamento", 2)),
    prisma.discipline.upsert(disciplineFactory("Autoconfiança", 3)),
  ]);

  await Promise.all([
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 1)),
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 2)),
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(1, 3)),
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 4)),
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 5)),
    prisma.teacherDiscipline.upsert(teacherDisciplineFactory(2, 6)),
  ]);
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
