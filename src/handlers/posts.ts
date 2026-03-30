import { getPostsForUser } from "../db/queries/posts.js";
import { User } from "../db/schema.js";
import { CLIError } from "../errors.js";
import { parseDuration } from "../parseDuration.js";
import { scrapeFeeds } from "../rss/scrape.js";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]): Promise<void> {
    let limit = 2;
    if (args) {
        limit = parseInt(args[0], 10);
        if (isNaN(limit) || limit <= 0) {
            throw new CLIError("Invalid limit");
        }
    }
    const posts = await getPostsForUser(user.id, limit);
    if (posts.length === 0) {
        console.log("No posts found for your feeds");
        return;
    }
    for (const post of posts) {
        console.log(`- ${post.posts.title} (${post.posts.url})`);
    }
}

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new CLIError("duration expected!");
    }
    const timeBetweenRequests = parseDuration(args[0]);
    console.log(`Collecting feeds every ${timeBetweenRequests}`);
    await scrapeFeeds().catch(console.error);
    const interval = setInterval(async () => {
        await scrapeFeeds().catch(console.error);
    }, timeBetweenRequests);
    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}
