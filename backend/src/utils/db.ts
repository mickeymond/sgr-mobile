import adodb from "node-adodb";

console.log(process.env.MSACCESSDB_PATH);
export const connection = adodb.open(
  `Provider=Microsoft.ACE.OLEDB.16.0;Data Source=${process.env.MSACCESSDB_PATH}`,
);

connection
  // .execute(`INSERT INTO usertable(user_name, [password], accesspage_name, branch_id, emp_id, backup_access, inactive) VALUES ('mickeymond', 'mickeymond', 'User', 101, 89, False, False);`)
  // .execute(`INSERT INTO [transaction](transaction_date, transaction_type, amount, customer_ref, user_name, branch_id, confirm, transfer, paid_withdrawal_date, paid_by) VALUES (Now(), 'Deposit', 10000, 15, 'asare', 105, False, False, Now(), 290);`)
  // .query(`SELECT TOP 10 * FROM usertable ORDER BY user_id DESC;`)
  // .query(`SELECT TOP 10 customer_ref, first_name, last_name, other_name, branch, registerd_date, active FROM customer WHERE branch = 101;`)
  // .query(`SELECT TOP 10 * FROM [transaction] ORDER BY transaction_id DESC;`)
  .query(`SELECT * FROM branch;`)
  .then((data) => {
    console.table(data);
  })
  .catch((error) => {
    console.error(error);
  });
