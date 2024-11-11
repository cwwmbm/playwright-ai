# tests-ai

Use Anthropic's Computer use API inside playwright tests.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## Installation

![alt text](image-1.png)

```bash
npm install --save-dev tests-ai
```

You'll need to set your Anthropic API key as an environment variable:

```sh
export ANTHROPIC_API_KEY=your-api-key
```

Or add it to your `.env` file:

```env
ANTHROPIC_API_KEY=your-api-key
```

## Usage

The `ai` function accepts two parameters:

1. A string describing the test action to perform in natural language.
2. An options object with:
   - `page`: Playwright Page object
   - `test`: Playwright Test object
