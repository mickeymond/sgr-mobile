import { Router } from "express";
import { body, matchedData, validationResult } from "express-validator";
import { connection } from "../utils/db";

// Initialize router
const usersRouter: Router = Router();

// Routes
usersRouter.post(
  "/login",
  body("username").isString(),
  body("password").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, data: null, error: errors.array() });
    }
    const { username, password } = matchedData(req);

    const result: Array<any> = await connection.query(
      `SELECT TOP 1 * FROM usertable WHERE user_name = '${username}' AND [password] = '${password}';`,
    );

    if (!result.length) {
      return res
        .status(401)
        .json({ success: false, data: null, error: "Invalid credentials" });
    }

    res.json({ success: true, data: result[0], error: null });
  },
);

// Export router
export default usersRouter;
