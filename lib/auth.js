import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_URL);
const db = client.db("better-auth-bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
});