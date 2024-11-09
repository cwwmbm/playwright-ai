import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("has title", async ({ page }) => {
  await page.goto("/");

  await ai("click on the counter button and verify that the count goes up", {
    page,
    test,
  });
});
