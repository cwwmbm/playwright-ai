import type SingularToolCall from "@anthropic-ai/sdk";
import type { Page } from "playwright";

// I don't know the exact type, hopefully they export it, if they do, feel free to replace this here

export const takeAction = async (page: Page, toolCall: SingularToolCall): Promise<boolean> => {
	// return true if the action was successfully taken
	return true;
};
