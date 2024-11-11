import { test, expect, APIRequestContext } from "@playwright/test";

test("api health check", async ({
  request,
}: {
  request: APIRequestContext;
}) => {
  const response = await request.get("http://localhost:5001/health-check");
  expect(response.status()).toBe(200);
});

test("api get price TON/USDT", async ({
  request,
}: {
  request: APIRequestContext;
}) => {
  const response = await request.get(
    "http://localhost:5001/price?symbol=TON/USDT"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data).toHaveProperty("TON/USDT");
  expect(data).toHaveProperty("USDT/TON");

  expect(data["TON/USDT"]).toBeDefined();
  expect(typeof data["TON/USDT"]).toBe("number");

  expect(data["USDT/TON"]).toBeDefined();
  expect(typeof data["USDT/TON"]).toBe("number");
});

test("api get history", async ({ request }: { request: APIRequestContext }) => {
  const response = await request.get("http://localhost:5001/history");
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data.total).toBeDefined();
  expect(typeof data.total).toBe("number");

  expect(data.skip).toBeDefined();
  expect(typeof data.skip).toBe("number");

  expect(data.limit).toBeDefined();
  expect(typeof data.limit).toBe("number");

  expect(Array.isArray(data.history)).toBe(true);
  expect(data.history.length).toBeGreaterThan(0);

  data.history.forEach(
    (item: {
      pair: string;
      price: number;
      inversePrice: number;
      date: Date;
    }) => {
      expect(item.pair).toBeDefined();
      expect(typeof item.pair).toBe("string");

      expect(item.price).toBeDefined();
      expect(typeof item.price).toBe("number");

      expect(item.inversePrice).toBeDefined();
      expect(typeof item.inversePrice).toBe("number");

      expect(item.date).toBeDefined();
      expect(typeof item.date).toBe("string");
      expect(new Date(item.date).toString()).not.toBe("Invalid Date");
    }
  );
});
