import { db } from "..";
import { feeds } from "../schema";
import { users } from "../schema";
import { eq, sql } from "drizzle-orm"

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({name, url, userId}).returning();
    return result;
}

export async function getFeedsWithUsers() {
    return await db.select().from(feeds).innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByUrl(url: string) {
    return await db.select().from(feeds).where(eq(feeds.url, url));
}

export async function markFeedFetched(feedId: string) {
    const [updated] = await db.update(feeds).set({
        fetchedAt: new Date(),
        updatedAt: new Date(),
    }).where(eq(feeds.id, feedId)).returning();
    return updated;
}

export async function getNextFeedToFetch() {
    const [selected] = await db.select().from(feeds)
    .orderBy(sql`${feeds.fetchedAt} NULLS FIRST`).limit(1);
    return selected;
}