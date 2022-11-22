import mongoose from "mongoose";
import { id, pwd, dbName, ip, port } from "./config";

export async function connect_db() {
  try {
    await mongoose.connect(`mongodb://${id}:${pwd}@${ip}:${port}/${dbName}`);
  } catch (err) {
    console.log(err);
  }
}
