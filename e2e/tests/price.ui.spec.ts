import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Price App/);
});

test("select a currency", async ({ page }) => {
  await page.click("text=ETH/BTC");
  await expect(page.locator("text=ETH/BTC")).toHaveCount(2);
  await page.click("text=TON/USDT");
  await expect(page.locator("text=ETH/BTC")).toHaveCount(1);
});

test("history page", async ({ page }) => {
  await page.click("text=History");
  await expect(page).toHaveURL("http://localhost:5173/history");
  await expect(page.locator("p")).toContainText(
    "Inprogress 😀, API is ready 🤖."
  );
});
