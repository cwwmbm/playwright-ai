import Anthropic from "@anthropic-ai/sdk";

export const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export const callAnthropicComputerUse = async (
  messages: Anthropic.Beta.BetaMessageParam[],
  displaySize: { width: number; height: number }
): Promise<Anthropic.Beta.Messages.BetaMessage> => {
  const response = await client.beta.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    betas: ["computer-use-2024-10-22"],
    messages: messages,
    tools: [
      {
        type: "computer_20241022",
        name: "computer",
        display_width_px: displaySize.width,
        display_height_px: displaySize.height,
        display_number: 1,
      },
    ],
  });

  return response;
};
