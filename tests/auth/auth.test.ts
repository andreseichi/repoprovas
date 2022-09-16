import app from "../../src/app";
import supertest from "supertest";

import { prisma } from "../../src/database/prisma";
import { userFactory } from "../../prisma/factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Sign up Route => POST /signup", () => {
  it("should be able to sign up a new user", async () => {
    const user = userFactory();

    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(201);
  });

  it("should not be able to sign up a new user with an existing email", async () => {
    const user = userFactory();

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(409);
  });

  it("should not be able to sign up a new user with an invalid email", async () => {
    const user = userFactory();
    user.email = "invalid_email";

    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(422);
  });

  it("should not be able to sign up a new user with a password less than 10 characters", async () => {
    const user = userFactory();
    user.password = "123456789";

    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(422);
  });

  it("should not be able to sign up a new user with a password different from the confirm password", async () => {
    const user = userFactory();
    user.confirmPassword = "1234567890";

    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(422);
  });
});

describe("Sign in Route => POST /signin", () => {
  it("should be able to sign in", async () => {
    const user = userFactory();

    const userLogin = { email: user.email, password: user.password };

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signin").send(userLogin);

    expect(result.status).toBe(200);
  });

  it("should not be able to sign in with an invalid email", async () => {
    const user = userFactory();

    const userLogin = { email: "invalid_email", password: user.password };

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signin").send(userLogin);

    expect(result.status).toBe(422);
  });

  it("should not be able to sign in with an valid email but non-existent email", async () => {
    const user = userFactory();

    const userLogin = {
      email: "invalid_email@invalid.com",
      password: user.password,
    };

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signin").send(userLogin);

    expect(result.status).toBe(401);
  });

  it("should not be able to sign in with an invalid password", async () => {
    const user = userFactory();

    const userLogin = { email: user.email, password: "invalid_password" };

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signin").send(userLogin);

    expect(result.status).toBe(401);
  });
});
