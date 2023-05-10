import mongoose from "mongoose";
import { id, pwd, dbName, ip, port } from "./config";
import { initAdmin } from "./controller/user";
import logger from "./lib/logger";

export async function connect_db() {
  try {
    await mongoose.connect(
      `mongodb://${id}:${pwd}@${ip}:${port}/${dbName}?replicaSet=rs0`,
      {
        authSource: "admin",
        useUnifiedTopology: true,
        useNewUrlParser: true,
        maxBsonSize: 64 * 1024 * 1024,
      }
    );
    try {
      await initAdmin();
    } catch (adminError) {
      console.log(adminError);
    }
    logger.info("connected db");
  } catch (err) {
    console.log(err);
  }
}
