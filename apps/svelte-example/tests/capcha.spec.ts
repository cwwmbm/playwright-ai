import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("solve the captcha", async ({ page }) => {
	await page.goto("/");
	await ai(
		"This is a quiz. Select the image that shows the front wheel of a motorcycle. then the rest of the motorcycle. then click check answer. if the test is passed the page will say congratulations.",
		{
			page,
			test,
		}
	);
	await page.waitForSelector("text=Congratulations");
});
