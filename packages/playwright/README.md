# tests-ai

Use Anthropic's Computer use API inside playwright tests.

```ts
import { test } from "@playwright/test";
import { ai } from "tests-ai";

test("click on counter button", async ({ page }) => {
  await page.goto("/");
  await ai("click on the counter button and verify that the count goes up", {
    page,
    test,
  });
});
```
