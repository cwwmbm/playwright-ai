import { APITestType, Page } from "./types.ts";
import { callAnthropicComputerUse } from "./anthropic-call.ts";
import Anthropic from "@anthropic-ai/sdk";

export const ai = async (
  task: string,
  config: { page: Page; test: APITestType },
  options?: ExecutionOptions
): Promise<any> => {
  const screenshot = await config.page.screenshot({
    type: "png"
  });

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: task,
        },
        {
          type: "image",
          source: {
            data: screenshot.toString("base64"),
            media_type: "image/png",
            type: 'base64',
          },
        },
      ],
    },
  ];



  const size = config.page.viewportSize();
  if (!size) {
    throw new Error("Viewport size not available");
  }
  const computeUsage = await callAnthropicComputerUse(messages, {
    height: size?.height,
    width: size?.width,
  });
  console.log("ALL CONTENT",computeUsage.content);
  console.log("TEST", computeUsage.content[0])
};

type ExecutionOptions = {
  // Specific to the package, sets the max number of steps we'll execute
  // in parallel when ai() is called with an array of tasks
  parallelism?: number;
  // If true, the ai() step will fail immediately once any step fails
  // rather than waiting for other tasks to resolve.
  failImmediately?: boolean;
};

export type AiFixture = {
  ai: (
    task: string | string[],
    options?: ExecutionOptions
  ) => ReturnType<typeof ai>;
};
