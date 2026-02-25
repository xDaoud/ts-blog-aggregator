import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds.js";
import { fetchFeed } from "./fetch.js";
import { createPost } from "src/db/queries/posts.js";

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (!feed) {
        console.log("No feeds available");
        return;
    }
    await markFeedFetched(feed.id);
    const rss = await fetchFeed(feed.url);
    if (!rss.channel?.item) {
        console.log("no items found in the channel");
        return;
    }
    
    for (const item of rss.channel.item) {
        const publishedAt = item.pubDate ? new Date(item.pubDate) : undefined;
        await createPost({
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt,
            feedId: feed.id,
        });
        console.log(`- ${item.title}:`);
        console.log(`{${item.description}}`);
    }
        
       /*
    for(const item of rss.channel.item){
        console.log(item.title);
    } */
    
}