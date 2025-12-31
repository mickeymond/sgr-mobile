import { connection } from "../utils/db";

export async function myAsyncAuthorizer(
  username: string,
  password: string,
  authorize: any,
) {
  const result: Array<any> = await connection.query(
    `SELECT TOP 1 * FROM usertable WHERE user_name = '${username}' AND [password] = '${password}';`,
  );
  if (!result.length) {
    return authorize(null, false);
  }
  return authorize(null, true);
}
