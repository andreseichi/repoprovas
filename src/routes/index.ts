import { Request, Response, Router } from "express";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { tokenSchema } from "../schemas/tokenSchema";

import { authRouter } from "./auth.routes";
import { testRouter } from "./tests.routes";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello World" });
});

router.use(authRouter);

router.use(validateHeaderSchema(tokenSchema));
router.use(isAuthenticated);

router.use(testRouter);

export default router;
