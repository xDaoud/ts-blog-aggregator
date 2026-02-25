import { getPostsForUser } from "./db/queries/posts";
import { User } from "./db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 2;
    if (args) {
        limit = parseInt(args[0], 10);
        if (isNaN(limit) || limit <= 0) {
            throw new Error("Invalid limit");
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