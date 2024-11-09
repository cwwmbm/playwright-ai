import { APITestType, Page } from "./types.ts";
import { callAnthropicComputerUse } from "./anthropic-call.ts";
import Anthropic from "@anthropic-ai/sdk";

export const ai = async (
  task: string,
  config: { page: Page; test: APITestType },
  options?: ExecutionOptions
): Promise<any> => {
  const screenshot = await config.page.screenshot();

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
          source: screenshot,
        },
      ],
    },
  ];

  callAnthropicComputerUse(messages);
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
