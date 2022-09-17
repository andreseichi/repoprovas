import supertest from "supertest";
import { testFactory } from "../../prisma/factories/testFactory";
import { tokenFactory } from "../../prisma/factories/tokenFactory";
import app from "../../src/app";
import { prisma } from "../../src/database/prisma";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Create test Route => POST /test/create", () => {
  it("should be able to create a new test", async () => {
    const test = testFactory();
    const token = tokenFactory();

    const result = await supertest(app)
      .post("/test/create")
      .send(test)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(201);
  });

  it("should not be able to create a new test an invalid category", async () => {
    const test = testFactory();
    const token = tokenFactory();
    test.category = "invalid category";

    const result = await supertest(app)
      .post("/test/create")
      .send(test)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(404);
    expect(result.body.message).toContain("not found");
  });

  it("should not be able to create a new test an invalid teacher", async () => {
    const test = testFactory();
    const token = tokenFactory();
    test.teacherId = -1;

    const result = await supertest(app)
      .post("/test/create")
      .send(test)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toBe(404);
    expect(result.body.message).toContain("not found");
  });
});
