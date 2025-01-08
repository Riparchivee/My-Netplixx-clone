import mongoose from "mongoose";
import { ENV_VARS } from "./envVar.js";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${ENV_VARS.MONGO_URL}`)
    console.log("MongoDb Connect" + connect.connection.host)
  } catch (error) {
   console.error("Error connecting to MangoDb" + error.message);
   process.exit(1); // 1 = error, 0 = success
    
  }
}
