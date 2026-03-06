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
  const q = req.query.q as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;
  
  const users: Array<any> = await connection.query(
    `SELECT TOP 1 * FROM usertable WHERE user_name = '${user}' AND [password] = '${password}';`,
  );
  if (!users.length) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let query = `SELECT TOP ${limit + skip} customer_ref, first_name, last_name, other_name, branch, registerd_date, active FROM customer WHERE branch = ${users[0].branch_id}`;
  if (q) {
    query += ` AND (first_name LIKE '%${q}%' OR last_name LIKE '%${q}%' OR other_name LIKE '%${q}%')`;
  }
  query += ` ORDER BY customer_ref DESC;`;

  const customers: Array<any> = await connection.query(query);
  const paginatedCustomers = customers.slice(skip, limit ? skip + limit : undefined);
  res.json(paginatedCustomers);
});

// Export router
export default customersRouter;
