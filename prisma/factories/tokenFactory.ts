import { generateAccessToken } from "../../src/utils/jwt";

export function tokenFactory() {
  return generateAccessToken({ id: 1, email: "email@email.com" });
}
