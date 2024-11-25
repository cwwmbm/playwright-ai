import Anthropic from "@anthropic-ai/sdk";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the root directory (two levels up from current file)
config({ path: resolve(__dirname, "../../../.env") });

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
