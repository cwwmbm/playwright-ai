import { beforeEach, describe, it, expect, vi } from 'vitest';
import { takeAction } from './takeAction.ts';
import type { Page } from 'playwright';

describe('takeAction', () => {
  let mockPage: Page;

  beforeEach(() => {
    mockPage = {
      keyboard: {
        press: vi.fn(),
        type: vi.fn(),
      },
      mouse: {
        move: vi.fn(),
        click: vi.fn(),
        down: vi.fn(),
        up: vi.fn(),
        dblclick: vi.fn(),
      },
      screenshot: vi.fn(),
    } as unknown as Page;
  });

  it('should press a key when action is "key"', async () => {
    const result = await takeAction(mockPage, { action: 'key', text: 'Enter' });
    expect(mockPage.keyboard.press).toHaveBeenCalledWith('Enter');
    expect(result).toBe(true);
  });

  it('should type text when action is "type"', async () => {
    const result = await takeAction(mockPage, { action: 'type', text: 'Hello' });
    expect(mockPage.keyboard.type).toHaveBeenCalledWith('Hello');
    expect(result).toBe(true);
  });

  it('should move mouse when action is "mouse_move"', async () => {
    const result = await takeAction(mockPage, { action: 'mouse_move', coordinate: [100, 200] });
    expect(mockPage.mouse.move).toHaveBeenCalledWith(100, 200);
    expect(result).toBe(true);
  });

  it('should click mouse when action is "left_click"', async () => {
    const result = await takeAction(mockPage, { action: 'left_click', coordinate: [100, 200] });
    expect(mockPage.mouse.click).toHaveBeenCalledWith(100, 200);
    expect(result).toBe(true);
  });

  it('should handle missing coordinates gracefully', async () => {
    const result = await takeAction(mockPage, { action: 'left_click' });
    expect(mockPage.mouse.click).toHaveBeenCalledWith(0, 0);
    expect(result).toBe(true);
  });

  it('should take a screenshot when action is "screenshot"', async () => {
    const result = await takeAction(mockPage, { action: 'screenshot' });
    expect(mockPage.screenshot).toHaveBeenCalledWith({ path: 'screenshot.png' });
    expect(result).toBe(true);
  });

  it('should log a warning for unsupported actions', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn');
    const result = await takeAction(mockPage, { action: 'unsupported_action' as any });
    expect(consoleWarnSpy).toHaveBeenCalledWith('Unsupported action type: unsupported_action');
    expect(result).toBe(false);
  });

  it('should handle errors gracefully', async () => {
    mockPage.keyboard.press = vi.fn().mockImplementation(() => { throw new Error('Test error'); });
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const result = await takeAction(mockPage, { action: 'key', text: 'Enter' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to execute action key:', expect.any(Error));
    expect(result).toBe(false);
  });
});