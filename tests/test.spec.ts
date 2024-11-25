import { test } from "@playwright/test";
import { ai } from "../packages/playwright/src/index";

test("Email Campaign - Set Goals Page - Add a Goal and try to click on Next with the required fields in blank", async ({ page }) => {
  // Navigate to the application
  test.slow();
  await page.goto("https://staging.feathr.co/");
  
  // Log in
  await ai("Authenticate with email feathr_automation_06@testlions.email and password zebrafinch-toucan-albatross-ibis and click Sign In button and verify dashboard page is displayed", { page, test });

  // Navigate to Projects section
  await ai("click the projects section in the side menu and select an existing project, verify all marketing page is displayed", { page, test });

  // Create a new campaign
  await ai("click on the 'Create' button (right corner), The 'Create a campaign' page is displayed", { page, test });
  // Get viewport size and move to center
  const viewportSize = page.viewportSize();
  if (viewportSize) {
    await page.mouse.move(viewportSize.width / 2, viewportSize.height / 2);
    await page.mouse.wheel(0, viewportSize.height);
  }
  
  // await ai("In the modal 'create campaign' window, scroll down using mouse wheel or a scrollbar on the right side of the modal window until you see the 'Single Send' option", { page, test });
  await ai("click on the 'Single Send' campaign, The 'Create a Campaign' page is displayed", { page, test });

  // Enter campaign details
  await ai("Introduce any Valid name for the 'Name' field (Automation Run+Day/Month/Year+Random set of characters), then click on the 'Create Campaign' button", { page, test });

  // Select a template
  await ai("Select any of the templates displayed, you can select the 'Blank Email' one.", { page, test });

  // Configure details
  await ai("Click on the 'Next' button, The 'Configure Details' page is displayed", { page, test });
  await ai("On the 'Sender information' section, for the 'From email address' dropdown, select the 'cesar.loera@feathr.co' value", { page, test });
  await ai("Make sure the 'Use contact info from verified email address' checkbox is already checked, if not check it", { page, test });

  // Set Goals
  await ai("Click on the 'Next' button, The 'Set Goals' page is displayed", { page, test });
  await ai("Click on the '+ Goal' Button", { page, test });
  await ai("Click on the The 'Group (required)' dropdown field > Then click on the '+ Create a Group' button", { page, test });

  // Validate required fields
  await ai("Make sure you are leaving the 'Name (required)' empty, Clean the content of the field, then click on the 'Goal Value' field", { page, test });
  await ai("Make sure you are leaving the 'Goal Value (required)' empty, Clean the content of the field, then click on the 'Name' field", { page, test });

  // Verify error messages
  await page.waitForSelector("text='Name can't be blank'");
  await page.waitForSelector("text='Please set a value'");
});
