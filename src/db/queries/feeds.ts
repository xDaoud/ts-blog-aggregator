import { db } from "..";
import { feeds } from "../schema";
import { users } from "../schema";
import { eq } from "drizzle-orm"

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