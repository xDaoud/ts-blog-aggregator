import { getUser } from "./config";
import { getFeedByUrl } from "./db/queries/feeds";
import { createFeedFollow } from "./db/queries/follows";
import { getUserByName } from "./db/queries/users";
import { User } from "./db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("url expected!");
    }
    const url = args[0];
    const [feed] = await getFeedByUrl(url);
    if (!feed) {
        throw new Error(`No feed found at ${url}`);
    }
    
    const follow = await createFeedFollow(user.id, feed.id);
    console.log(`${follow.userName} is now following ${follow.feedName}`);
}