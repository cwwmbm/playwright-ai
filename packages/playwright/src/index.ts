import { APIPage, APITestType, Page } from "./types.ts";
import { callAnthropicComputerUse } from "./anthropic-call.ts";

export const ai = async (
  task: string | string[],
  config: { page: Page; test: APITestType },
  options?: ExecutionOptions
): Promise<any> => {
  const screenshot = await config.page.screenshot();

  const messages = [
    {
      role: "user",
      content: task,
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
