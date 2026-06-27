import dns from "node:dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { URL } from "node:url";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config({ path: "./.env" });

const mongoUri = process.env.MONGO_URL;

if (typeof mongoUri !== "string" || mongoUri.length === 0) {
    throw new Error("Please define MONGO_URL in your environment.");
}

const mongoUriString: string = mongoUri;

let connectionPromise: Promise<typeof mongoose> | null = null;

function buildDirectMongoUri(uri: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const parsedUri = new URL(uri);

            if (parsedUri.protocol !== "mongodb+srv:") {
                resolve(uri);
                return;
            }

            const serviceName = `_mongodb._tcp.${parsedUri.hostname}`;
            const auth = parsedUri.username
                ? `${decodeURIComponent(parsedUri.username)}:${decodeURIComponent(parsedUri.password || "")}@`
                : "";

            dns.resolveSrv(serviceName, (error, records) => {
                if (error) {
                    reject(error);
                    return;
                }

                const seedHosts = records
                    .sort((left, right) => left.priority - right.priority || left.weight - right.weight)
                    .map((record) => `${record.name}:${record.port}`)
                    .join(",");

                const pathname = parsedUri.pathname && parsedUri.pathname !== "/" ? parsedUri.pathname : "";
                const searchParams = new URLSearchParams(parsedUri.search);
                searchParams.set("tls", "true");

                resolve(`mongodb://${auth}${seedHosts}${pathname}?${searchParams.toString()}`);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export async function connect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    if (!connectionPromise) {
        connectionPromise = (async () => {
            try {
                const resolvedUri = await buildDirectMongoUri(mongoUriString);
                const connection = await mongoose.connect(resolvedUri, {
                    serverSelectionTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                    family: 4,
                    maxPoolSize: 5,
                });

                mongoose.connection.on("connected", () => {
                    console.log("Database connected successfully");
                });

                mongoose.connection.on("error", (err) => {
                    console.log("Error connecting to database: " + err);
                });

                return connection;
            } catch (error) {
                connectionPromise = null;
                throw new Error(
                    `MongoDB connection failed. Check your network, DNS, and Atlas allowlist. Original error: ${error instanceof Error ? error.message : String(error)}`
                );
            }
        })();
    }

    return connectionPromise;
}