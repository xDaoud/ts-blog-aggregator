import { Feed, User } from "./schema";

export function printFeed(feed: Feed, user: User): void {
  console.log("Feed:");
  console.log(`  ID: ${feed.id}`);
  console.log(`  Name: ${feed.name}`);
  console.log(`  URL: ${feed.url}`);
  console.log(`  User: ${user.name} (${user.id})`);
  console.log(`  Created At: ${feed.createdAt}`);
  console.log(`  Updated At: ${feed.updatedAt}`);
}