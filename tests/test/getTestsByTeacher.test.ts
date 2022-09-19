import supertest from "supertest";
import { tokenFactory } from "../../prisma/factories/tokenFactory";
import app from "../../src/app";
import { prisma } from "../../src/database/prisma";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Get tests by teachers => GET /tests/teacher", () => {
  it("should return status code 200 when get tests by teacher", async () => {
    const token = tokenFactory();

    const response = await supertest(app)
      .get("/tests/teacher")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return an array with tests by teachers", async () => {
    const token = tokenFactory();

    const response = await supertest(app)
      .get("/tests/teacher")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          categories: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              tests: expect.arrayContaining([]),
            }),
          ]),
        }),
      ])
    );
  });
});
