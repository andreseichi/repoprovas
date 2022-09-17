import { faker } from "@faker-js/faker";

export function testFactory() {
  return {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    disciplineId: 1,
    teacherId: 1,
  };
}
