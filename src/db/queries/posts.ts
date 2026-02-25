import { RSSPost } from "src/rss/types";
import { db } from "..";
import { feedFollows, posts } from "../schema";
import { eq, desc } from "drizzle-orm";


export async function createPost(post: RSSPost) {
  const [inserted] = await db.insert(posts)
    .values(post)
    .onConflictDoNothing({ target: posts.url })
    .returning();

  return inserted;
}


export async function getPostsForUser(userId: string, limit = 2) {
  return await db.select()
    .from(posts)
    .innerJoin(feedFollows, eq(feedFollows.feedId, posts.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}
