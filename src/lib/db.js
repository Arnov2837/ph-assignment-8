import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

/** Single MongoClient instance — `db()` is sync; connect happens via `clientPromise`. */
if (!global._mongoClientForAuth) {
    global._mongoClientForAuth = uri ? new MongoClient(uri) : null;
}

export const mongoClient = global._mongoClientForAuth;

let clientPromise;

if (!global._mongoClientPromise) {
    if (!uri || !mongoClient) {
        global._mongoClientPromise = Promise.reject(
            new Error(
                "MONGODB_URI is missing. Add it to .env.local (MongoDB connection string)."
            )
        );
    } else {
        global._mongoClientPromise = mongoClient.connect();
    }
}

clientPromise = global._mongoClientPromise;

export default clientPromise;