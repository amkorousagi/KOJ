import jwt from "jsonwebtoken";
import { findUserByIdAndUser_type } from "../controller/user";
import { sendErrorWithoutLog } from "../lib/common";
import { secret } from "../secret";

export const authorization_handler = (user_types) => async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.substring(7);

      if (!token || token == "null") {
        sendErrorWithoutLog({ req, res, error: "no token" });
      } else {
        const decoded_token = await jwt.verify(token, secret);

        if (user_types) {
          let is_correct_user = false;
          for (const user_type of user_types) {
            if (user_type == decoded_token.user_type) {
              is_correct_user = true;
            }
          }
          if (!is_correct_user) {
            sendErrorWithoutLog({ req, res, error: "wrong user type" });
          }
        }

        const result = await findUserByIdAndUser_type({
          id: decoded_token.id,
          user_type: decoded_token.user_type,
        });
        if (result) {
          req.user = result;
          next();
        } else {
          sendErrorWithoutLog({ req, res, error: "invaild token" });
        }
      }
    } else {
      sendErrorWithoutLog({ req, res, error: "wrong authorization" });
    }
  } catch (err) {
    sendErrorWithoutLog({ req, res, error: "authorization error:" + err });
  }
};
