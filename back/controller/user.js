import User from "../model/user";

export async function findUserById(id) {
  return await User.findOne({ id });
}
