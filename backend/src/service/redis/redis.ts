import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

(async () => {
  try {
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
