import { printFeed } from "./db/printFeeds";
import { getFeedsWithUsers } from "./db/queries/feeds";

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void>{
    const rows = await getFeedsWithUsers();
    for(const row of rows){
        printFeed(row.feeds, row.users);
    }
}