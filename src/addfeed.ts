import { getUser } from "./config";
import { printFeed } from "./db/printFeeds";
import { createFeed } from "./db/queries/feeds";
import { getUserByName } from "./db/queries/users";

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void>{
    if(args.length !== 2){
        throw new Error("name and url expected!");
    }
    const [name, url] = args;
    const currentUserName = getUser();
    if(!currentUserName){
        throw new Error("No user logged in!");
    }
    const user = await getUserByName(currentUserName)
    const feed = await createFeed(name, url, user.id);
    console.log("Feed created:", feed.name);
    printFeed(feed, user);
}