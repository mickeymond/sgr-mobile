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

  const transactions: Array<any> = await connection.query(
    `SELECT * FROM [transaction] WHERE paid_by = ${users[0].user_id};`,
  );
  res.json(transactions);
});

// Export router
export default transactionsRouter;
