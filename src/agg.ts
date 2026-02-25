import { fetchFeed } from "./rss/fetch.js";
import { parseDuration } from "./parseDuration.js";
import { scrapeFeeds } from "./rss/scrape.js";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("duration expected!");
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