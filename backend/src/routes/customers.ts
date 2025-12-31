import { Router } from "express";
import basicAuth from "express-basic-auth";
import { myAsyncAuthorizer } from "../middlewares/auth";
import { connection } from "../utils/db";

// Create router instance
const customersRouter: Router = Router();

// Middleware
customersRouter.use(
  basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
  }),
);

// Define routes
customersRouter.get("/", async (req, res) => {
  const { user, password } = (req as basicAuth.IBasicAuthedRequest).auth;
  const users: Array<any> = await connection.query(
    `SELECT TOP 1 * FROM usertable WHERE user_name = '${user}' AND [password] = '${password}';`,
  );
  if (!users.length) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const customers: Array<any> = await connection.query(
    `SELECT customer_ref, first_name, last_name, other_name, branch, registerd_date, active FROM customer WHERE branch = ${users[0].branch_id};`,
  );
  res.json(customers);
});

// Export router
export default customersRouter;
