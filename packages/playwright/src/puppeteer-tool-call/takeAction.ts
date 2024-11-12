import type { Page } from "playwright";

export type ToolCall = {
  action:
    | "key"
    | "type"
    | "mouse_move"
    | "left_click"
    | "left_click_drag"
    | "right_click"
    | "middle_click"
    | "double_click"
    | "screenshot"
    | "cursor_position";
  coordinate?: [number, number];
  text?: string;
};
export async function takeAction(
  page: Page,
  action: ToolCall
): Promise<boolean> {
  try {
    switch (action.action) {
      case "key":
        if (!action.text) return false;
        await page.keyboard.press(action.text);
        break;

      case "type":
        if (!action.text) return false;
        await page.keyboard.type(action.text);
        break;

      case "mouse_move":
        if (!action.coordinate) return false;
        await page.mouse.move(action.coordinate[0], action.coordinate[1]);
        break;

      case "left_click":
        await page.mouse.down();
        await page.mouse.up();
        break;

      case "left_click_drag":
        if (!action.coordinate) return false;
        await page.mouse.down();
        await page.mouse.move(action.coordinate[0], action.coordinate[1]);
        await page.mouse.up();
        break;

      case "right_click":
        await page.mouse.click(
          action.coordinate?.[0] ?? 0,
          action.coordinate?.[1] ?? 0,
          { button: "right" }
        );
        break;

      case "middle_click":
        await page.mouse.click(
          action.coordinate?.[0] ?? 0,
          action.coordinate?.[1] ?? 0,
          { button: "middle" }
        );
        break;

      case "double_click":
        await page.mouse.dblclick(
          action.coordinate?.[0] ?? 0,
          action.coordinate?.[1] ?? 0
        );
        break;

      case "screenshot":
        await page.screenshot({ path: "screenshot.png" });
        break;

      case "cursor_position":
        const position = await page.mouse.move(
          action.coordinate?.[0] ?? 0,
          action.coordinate?.[1] ?? 0
        );
        console.log(position);
        break;

      default:
        console.warn(`Unsupported action type: ${action.action}`);
        return false;
    }

    return true;
  } catch (error) {
    console.error(`Failed to execute action ${action.action}:`, error);
    return false;
  }
}
