import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("solve the captcha", async ({ page }) => {
	await page.goto("/");
	for (let i = 0; i < 4; i++) {
		try {
			await ai(
				"This is a quiz. Select the tiles that show the motorcycle. then click 'check answer'. if the test is passed the page will say 'Congratulations'. ",
				{
					page,
					test,
				}
			);
			break;
		} catch (e) {
			continue;
		}
	}
	await page.waitForSelector("text=Congratulations");
});
