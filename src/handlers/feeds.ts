import { printFeed } from "../db/printFeeds.js";
import { createFeed, getFeedsWithUsers, getFeedByUrl } from "../db/queries/feeds.js";
import { createFeedFollow, getFeedFollowsForUser, deleteFeedFollowByUrl } from "../db/queries/follows.js";
import { User } from "../db/schema.js";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length < 2) {
        throw new Error("name and url expected!");
    }
    const [name, url] = args;
    const feed = await createFeed(name, url, user.id);
    const followFeed = await createFeedFollow(user.id, feed.id);
    console.log("Feed created:", feed.name);
    console.log(`${followFeed.userName} is following ${followFeed.feedName}`);
    printFeed(feed, user);
}

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {
    const rows = await getFeedsWithUsers();
    for (const row of rows) {
        printFeed(row.feeds, row.users);
    }
}

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
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

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const rows = await getFeedFollowsForUser(user.id);
    if (!rows) {
        throw new Error("You're not following any feeds!");
    }
    for (const row of rows) {
        console.log(row.feedName);
    }
}
