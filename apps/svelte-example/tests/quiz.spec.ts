import { test } from "@playwright/test";
import { ai } from "../../../packages/playwright/src/index";

test("Solve the quiz.", async ({ page }) => {
	await page.goto("/");
	try {
		await ai(
			"This is a quiz. Select the tiles that show the motorcycle. Then click 'check answer'. If the test is passed the page will say 'Congratulations'. ",
			{
				page,
				test,
			}
		);
	} catch (e) {
		test.fail();
		console.log(e);
	}
	// await page.waitForSelector("text=Congratulations");
});
