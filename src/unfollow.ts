import { deleteFeedFollowByUrl } from "./db/queries/follows";
import { User } from "./db/schema";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length < 1) {
        throw new Error("Please privide a URL");
    }
    const url = args[0];
    const deleted = await deleteFeedFollowByUrl(user.id, url);

    if (!deleted) {
        console.log(`${user.name} was not following feed at ${url}`);
        return;
    }

    console.log(`${user.name} has unfollowed feed at ${url}`);
}