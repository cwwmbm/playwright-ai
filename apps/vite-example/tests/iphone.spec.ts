import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src";

test("put an iphone in cart", async ({ page }) => {
  await page.goto("https://www.apple.com");
  await ai("put the newest iphone in my cart", { page, test });
});
