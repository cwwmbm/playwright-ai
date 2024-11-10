import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("solve the captcha", async ({ page }) => {
  await page.goto("/");
  await page.setViewportSize({
    width: 1024,
    height: 768,
  });
  await ai(
    "This is a quiz. Select the image that shows the motorcycle most. then the rest of the motorcycle. click all 4 images that show the motorcycle. then click 'check answer'. if the test is passed the page will say 'Congratulations'. ",
    {
      page,
      test,
    }
  );
  await page.waitForSelector("text=Congratulations");
});
