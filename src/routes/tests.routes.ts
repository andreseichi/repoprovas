import { Router } from "express";
import { createTest } from "../controllers/testController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post("/test/create", validateSchema(testSchema), createTest);

export { testRouter };
