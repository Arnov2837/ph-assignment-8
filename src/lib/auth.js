import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { mongoClient } from "./db";

const googleConfigured =
    Boolean(process.env.GOOGLE_CLIENT_ID) &&
    Boolean(process.env.GOOGLE_CLIENT_SECRET);

if (!mongoClient) {
    throw new Error(
        "MONGODB_URI is required. Add it to .env.local before using Better Auth."
    );
}

const mongoDb = mongoClient.db("mangoDB");

export const auth = betterAuth({
    database: mongodbAdapter(mongoDb, { client: mongoClient }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        ...(googleConfigured
            ? {
                  google: {
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
              }
            : {}),
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [nextCookies()],
});