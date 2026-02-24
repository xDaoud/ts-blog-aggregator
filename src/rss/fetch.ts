import { XMLParser } from "fast-xml-parser";
import { RSSItem } from "./types";

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator",
        },
    });
    const xml = await response.text();
    const parser = new XMLParser();
    const data = parser.parse(xml);
    if (!data.rss) {
        throw new Error("Invalid RSS");
    }
    const channel = data.rss.channel;
    if (!channel) {
        throw new Error("Missing Channel");
    }
    const title = channel.title;
    const link = channel.link;
    const description = channel.description;
    if (!title || !link || !description) {
        throw new Error("Missing Channel Metadata");
    }
    let items: any[] = [];
    if (channel.item) {
        items = (Array.isArray(channel.item)) ? channel.item : [channel.item];
    }
    const result: RSSItem[] = [];
    for (const item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }
        result.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
        });
    }
    return {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: items,
        },
    };
}