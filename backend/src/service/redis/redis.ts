import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const redisHost = process.env.REDIS_HOST || "redis";
const redisPort = process.env.REDIS_PORT || "6379";

export const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

(async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      redisClient.on("error", (err) => console.log("Redis Client Error", err));
      await redisClient.connect();
      console.log("Connected to Redis");
    } else {
      console.log("Skipping Redis connection in test environment");
    }
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
