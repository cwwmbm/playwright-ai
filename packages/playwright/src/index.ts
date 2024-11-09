import { APITestType, Page } from "./types.ts";
import { callAnthropicComputerUse } from "./anthropic-call.ts";
import Anthropic from "@anthropic-ai/sdk";
import { takeAction, ToolCall } from "../../puppeteer-tool-call/src/main.ts";

export const ai = async (
  task: string,
  config: { page: Page; test: APITestType },
  options?: ExecutionOptions
): Promise<any> => {
  const screenshot = await config.page.screenshot({
    type: "png",
  });

  let messages: Anthropic.Beta.BetaMessageParam[] = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: task,
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "image",
          source: {
            data: screenshot.toString("base64"),
            media_type: "image/png",
            type: "base64",
          },
        },
      ],
    },
  ];

  const size = config.page.viewportSize();
  if (!size) {
    throw new Error("Viewport size not available");
  }

  // run 20 times
  for (let i = 0; i < 20; i++) {
    const computeUsage = await callAnthropicComputerUse(messages, {
      height: size?.height,
      width: size?.width,
    });
    console.log("ALL CONTENT", computeUsage.content);
    console.log("TEST", computeUsage.content[0]);
    const toolCall: {
      name: string;
      type: string;
      id: string
      input: ToolCall
    } = computeUsage.content.find(
      (c) => c.type === "tool_use"
    )?.input as {
      name: string;
      type: string;
      id: string
      input: ToolCall
    };
    if (!toolCall) {
      throw new Error("No tool call found");
    }

    
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_use",
          id: toolCall.id,
          input: toolCall.,
        },
    });


    if (toolCall.action === "screenshot") {
      messages.push({
        role: "user",
        content: [
          {
            type: "image",
            source: {
              data: screenshot.toString("base64"),
              media_type: "image/png",
              type: "base64",
            },
          },
        ],
      });
    } else {
      takeAction(config.page, toolCall);
      messages.push({
        role: "user",
        content: [
          
        ]
      })
    }
  }
  // const computeUsage = await callAnthropicComputerUse(messages, {
  //   height: size?.height,
  //   width: size?.width,
  // });
  // console.log("ALL CONTENT", computeUsage.content);
  // console.log("TEST", computeUsage.content[0]);
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
