import type { Page } from "puppeteer";

// I don't know the exact type, hopefully they export it, if they do, feel free to replace this here
type SingularToolCall = object;
export const takeAction = async (page: Page, toolCall: SingularToolCall):Promise<boolean> =>{
    
    // return true if the action was successfully taken
    return true;
}
