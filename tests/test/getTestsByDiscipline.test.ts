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

describe("Get tests by discipline => GET /tests/discipline", () => {
  it("should return status code 200 when get tests by discipline", async () => {
    const token = tokenFactory();

    const response = await supertest(app)
      .get("/tests/discipline")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return an array with tests by discipline", async () => {
    const token = tokenFactory();

    const response = await supertest(app)
      .get("/tests/discipline")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          number: expect.any(Number),
          disciplines: expect.arrayContaining([]),
        }),
      ])
    );
  });
});
