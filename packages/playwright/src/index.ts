import Anthropic from "@anthropic-ai/sdk";
import { BetaTextBlock } from "@anthropic-ai/sdk/src/resources/beta/index.js";
import { Page, TestType } from "@playwright/test";
import { callAnthropicComputerUse, client } from "./anthropic-call.js";
import { takeAction, ToolCall } from "./puppeteer-tool-call/takeAction.js";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const ai = async (task: string, config: { page: Page; test: TestType<any, any> }): Promise<any> => {
	let result = await runTest(config, task);
	if (!result.success) {
		throw new Error(result.message);
	} else {
		return result;
	}
};

export type AiFixture = {
	ai: (task: string | string[]) => ReturnType<typeof ai>;
};

export const runTest = async (
	config: { page: Page; test: TestType<any, any> },
	task: string,
	options: {
		maxIterations: number;
	} = {
		maxIterations: 100,
	}
): Promise<{
	message: string;
	success: boolean;
}> => {
	const initial_screenshot = await config.page.screenshot({
		type: "png",
	});
	const pageSize = config.page.viewportSize();

	let messages: Anthropic.Beta.BetaMessageParam[] = [
		{
			role: "user",
			content: [
				{
					type: "text",
					text: "You are a Test Engineer testing a web page. When you choose to take an action, do so how a human would. For example, if you need to click on something, click confidently roughly in the center of the element. If you need to type something, type a realistic example of what a user would type based on the context of the site, page and task. Always make sure the previous action was completed before taking the next action, where applicable.",
				},
			],
		},
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
						data: initial_screenshot.toString("base64"),
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

	for (let i = 0; i < options.maxIterations; i++) {
		await config.page.waitForTimeout(500);
		const computeUsage = await callAnthropicComputerUse(messages, {
			height: size?.height,
			width: size?.width,
		});
		console.log("ALL CONTENT", computeUsage.content);
		console.log("TEST", computeUsage.content[0]);

		const toolCall: {
			name: string;
			type: string;
			id: string;
			input: ToolCall;
		} = computeUsage.content.find((c) => c.type === "tool_use") as {
			name: string;
			type: string;
			id: string;
			input: ToolCall;
		};

		if (!toolCall) {
			console.log("NO TOOL CALL");
			const final = await client.beta.messages.create({
				model: "claude-3-5-sonnet-20241022",
				tool_choice: undefined,
				betas: ["computer-use-2024-10-22"],
				tools: [
					{
						// type: "computer_20241022",
						name: "computer",
						type: "computer_20241022",
						display_width_px: pageSize!.width,
						display_height_px: pageSize!.height,
						display_number: 1,
					},
				],
				messages: [
					...messages,
					{
						role: "user",
						content: [
							{
								type: "text",
								text: "Summarize the test execution in JSON format with two keys: 'success' (boolean), and 'message' (string that list all actions taken).",
							},
						],
					},
				],
				max_tokens: 1024,
			});
			console.log("FINAL", final.content);
			return JSON.parse((final.content[0] as BetaTextBlock).text);
		} else {
			messages.push({
				role: "assistant",
				content: [
					{
						type: "tool_use",
						id: toolCall.id,
						input: toolCall.input,
						name: toolCall.name,
					},
				],
			});
		}

		if (toolCall.input.action === "screenshot") {
			let screenshot = await config.page.screenshot({
				type: "png",
			});
			messages.push({
				role: "user",
				content: [
					{
						type: "tool_result",
						tool_use_id: toolCall.id,
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
				],
			});
		} else {
			config.page.waitForLoadState("domcontentloaded");
			takeAction(config.page, toolCall.input);
			messages.push({
				role: "user",
				content: [
					{
						type: "tool_result",
						tool_use_id: toolCall.id,
						content: [
							{
								type: "text",
								text: "Success",
							},
						],
					},
				],
			});
		}
	}
	return {
		message: "Max iterations reached",
		success: false,
	};
};
