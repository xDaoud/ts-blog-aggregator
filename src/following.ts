import { getUser } from "./config";
import { getFeedFollowsForUser } from "./db/queries/follows";
import { getUserByName } from "./db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void>{
    const currentUserName = getUser();
        if (!currentUserName) {
            throw new Error("No user logged in!");
        }
        const user = await getUserByName(currentUserName);
        const rows = await getFeedFollowsForUser(user.id);
        if(!rows){
            throw new Error("You're not following any feeds!");
        }
        for(const row of rows){
            console.log(row.feedName);
        }
}