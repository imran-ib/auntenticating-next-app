import { verify } from "jsonwebtoken";

// export const APP_SECRET = process.env.APP_SECRET
export const APP_SECRET = "MyNewApp";

interface Token {
  UserId: string;
}

export function getUserId(context) {
  const Authorization = context.req.headers["authorization"];
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET) as Token;
    const res = verifiedToken && verifiedToken.UserId;
    return res;
  }
}
