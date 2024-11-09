import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

export const callAnthropicComputerUse = async (): Promise<boolean> => {
  await client.beta.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    betas: ["computer-use-2024-10-22"],
    messages: [],
    tools: [
      {
        type: "computer_20241022",
        name: "computer",
        display_width_px: 1024,
        display_height_px: 768,
        display_number: 1,
      },
    ],
  });

  return true;
};
