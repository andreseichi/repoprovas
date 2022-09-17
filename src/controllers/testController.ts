import { Request, Response } from "express";

import { createTestService } from "../services/testService";
import { TestData } from "../types/tests";

export async function createTest(req: Request, res: Response) {
  const { body }: Record<string, TestData> = res.locals;

  const result = await createTestService(body);

  return res.status(201).send(result);
}
