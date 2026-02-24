import { getUser } from "./config";
import { getFeedFollowsForUser } from "./db/queries/follows";
import { getUserByName } from "./db/queries/users";
import { User } from "./db/schema";

export async function handlerFollowing(cmdName: string, user:User, ...args: string[]): Promise<void> {
    
    const rows = await getFeedFollowsForUser(user.id);
    if (!rows) {
        throw new Error("You're not following any feeds!");
    }
    for (const row of rows) {
        console.log(row.feedName);
    }
}