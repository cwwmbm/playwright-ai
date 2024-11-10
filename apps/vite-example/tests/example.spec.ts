import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("click on counter button", async ({ page }) => {
  // await page.setViewportSize({
  //   width: 1024,
  //   height: 768,
  // });
  await page.goto("/");
  await ai("click on the counter button and verify that the count goes up", {
    page,
    test,
  });
});
