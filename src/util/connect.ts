import mongoose from 'mongoose';
import "dotenv/config";
import { ServerApiVersion } from 'mongodb';

const serverHost: string = (process.argv.includes("--atlas") ? process.env.ATLAS_SERVER : process.env.SERVER_URL) || '';
const databaseName: string = process.env.DB_NAME || "";
export const ConnectToDatabase = async () => {
    console.log(serverHost)
    try {
      await mongoose.connect(serverHost, {
        dbName: databaseName,
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      console.log("CONNECTED");
    } catch (error) {
      throw new Error(`${error}`);
    }
  }