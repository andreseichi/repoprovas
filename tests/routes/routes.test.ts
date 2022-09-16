import supertest from "supertest";
import app from "../../src/app";

describe("Route /", () => {
  it("should return 200", async () => {
    const result = await supertest(app).get("/");

    expect(result.status).toBe(200);
  });
});
