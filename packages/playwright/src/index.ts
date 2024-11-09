import { APIPage, APITestType } from "./types.ts";

export const ai = async (
  task: string | string[],
  config: { page: APIPage; test: APITestType },
  options?: ExecutionOptions
): Promise<any> => {};

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
