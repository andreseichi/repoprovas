import { prisma } from "../src/database/prisma";
import categoryFactory from "./factories/categoryFactory";
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
