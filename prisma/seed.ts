import { prisma } from "../src/database/prisma";
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
