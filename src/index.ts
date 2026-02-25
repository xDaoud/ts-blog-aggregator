import { handlerAddFeed } from "./addfeed.js";
import { handlerAgg } from "./agg.js";
import { handlerBrowse } from "./browse.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands.js";
import { handlerFeeds } from "./feeds.js";
import { handlerFollow } from "./follow.js";
import { handlerFollowing } from "./following.js";
import { handlerLogin } from "./login.js";
import { middlewareLoggedIn } from "./middleware/loggedIn.js";
import { handlerRegister } from "./register.js";
import { handleReset } from "./reset.js";
import { handlerUnfollow } from "./unfollow.js";
import { handlerUsers } from "./users.js";
async function main() {
    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handleReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
    registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
    registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
    const args = process.argv.slice(2);
    if(args.length === 0){
        console.log("No command provided");
        process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        await runCommand(registry, cmdName, ...cmdArgs);
        process.exit(0);
    } catch(err : any) {
        console.error(err.message);
        process.exit(1);
    }
}

await main();
