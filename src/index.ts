import { handlerLogin, handlerRegister, handleReset, handlerUsers } from "./handlers/auth.js";
import { handlerAddFeed, handlerFeeds, handlerFollow, handlerFollowing, handlerUnfollow } from "./handlers/feeds.js";
import { handlerAgg, handlerBrowse } from "./handlers/posts.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands.js";
import { middlewareLoggedIn } from "./middleware/loggedIn.js";
import { CLIError } from "./errors.js";
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
        console.error("No command provided");
        process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        await runCommand(registry, cmdName, ...cmdArgs);
        process.exit(0);
    } catch(err) {
        if (err instanceof CLIError) {
            console.error(`Error: ${err.message}`);
        } else {
            console.error("Unexpected error:", err);
        }
        process.exit(1);
    }
}

await main();
