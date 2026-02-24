import { fetchFeed } from "./rss/fetch.js";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    const url = "https://www.wagslane.dev/index.xml";
    const feed = await fetchFeed(url);
    console.log(JSON.stringify(feed, null, 2));
}