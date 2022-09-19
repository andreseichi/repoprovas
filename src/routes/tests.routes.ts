import { Router } from "express";
import {
  createTest,
  getTestsByDiscipline,
  getTestsByTeacher,
} from "../controllers/testController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/test/create", validateSchema(testSchema), createTest);

testRouter.get("/tests/discipline", getTestsByDiscipline);
testRouter.get("/tests/teacher", getTestsByTeacher);

export { testRouter };
