import { Router } from "express";
import basicAuth from "express-basic-auth";
import { body, matchedData, validationResult } from "express-validator";
import { myAsyncAuthorizer } from "../middlewares/auth";
import { connection } from "../utils/db";

// Create router instance
const transactionsRouter: Router = Router();

// Middleware
transactionsRouter.use(
  basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
  }),
);

// Add transaction
transactionsRouter.post(
  "/",
  body("transaction_type").isIn(["Deposit", "Withdrawal"]),
  body("amount").isNumeric(),
  body("customer_ref").isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { user, password } = (req as basicAuth.IBasicAuthedRequest).auth;
    const users: Array<any> = await connection.query(
      `SELECT TOP 1 * FROM usertable WHERE user_name = '${user}' AND [password] = '${password}';`,
    );
    if (!users.length) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { transaction_type, amount, customer_ref } = matchedData(req);

    await connection.execute(
      `INSERT INTO [transaction](transaction_date, transaction_type, amount, customer_ref, user_name, branch_id, confirm, transfer, paid_withdrawal_date, paid_by) VALUES (Now(), '${transaction_type}', ${amount}, ${customer_ref}, '${users[0].user_name}', ${users[0].branch_id}, False, False, Now(), ${users[0].user_id});`,
    );

    res.json({ success: true, message: "Transaction added successfully" });
  },
);

// Get all transactions
transactionsRouter.get("/", async (req, res) => {
  const { user, password } = (req as basicAuth.IBasicAuthedRequest).auth;
  const users: Array<any> = await connection.query(
    `SELECT TOP 1 * FROM usertable WHERE user_name = '${user}' AND [password] = '${password}';`,
  );
  if (!users.length) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const q = req.query.q as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;

  let query = `SELECT TOP ${limit + skip} * FROM [transaction] INNER JOIN [customer] ON [transaction].customer_ref = [customer].customer_ref WHERE paid_by = ${users[0].user_id}`;

  if (q) {
    query += ` AND ([customer].first_name LIKE '%${q}%' OR [customer].last_name LIKE '%${q}%')`;
  }

  query += ` ORDER BY transaction_id DESC;`;

  const transactions: Array<any> = await connection.query(query);
  const paginatedTransactions = transactions.slice(
    skip,
    limit ? skip + limit : undefined,
  );
  res.json(paginatedTransactions);
});

// Export router
export default transactionsRouter;
