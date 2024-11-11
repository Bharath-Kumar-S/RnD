import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Price App/);
});

test("select a currency", async ({ page }) => {
  await page.selectOption('select[name="currency"]', { value: "ETH/BTC" });

  const selectedValue = await page
    .locator('select[name="currency"]')
    .inputValue();
  expect(selectedValue).toBe("ETH/BTC");
});

test("history page", async ({ page }) => {
  await page.click("text=History");
  await expect(page).toHaveURL("http://localhost:5173/history");
  await expect(page.locator("p")).toContainText(
    "Inprogress 😀, API is ready 🤖."
  );
});
