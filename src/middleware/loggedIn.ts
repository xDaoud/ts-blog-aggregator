import { CommandHandler } from "src/commands";
import { getUser } from "src/config";
import { getUserByName } from "src/db/queries/users";
import { User } from "src/db/schema";

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export const middlewareLoggedIn =
  (handler: UserCommandHandler): CommandHandler =>
  async (cmdName: string, ...args: string[]) => {
    const userName = getUser();

    const user = await getUserByName(userName);
    if (!user) {
      throw new Error(`User ${userName} not found`);
    }

    return await handler(cmdName, user, ...args);
  };