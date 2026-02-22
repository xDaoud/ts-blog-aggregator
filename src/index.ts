import { CommandsRegistry, registerCommand, runCommand } from "./commands.js";
import { handlerLogin } from "./login.js";
function main() {
    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);

    const args = process.argv.slice(2);
    if(args.length === 0){
        console.log("No command provided");
        process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    try {
        runCommand(registry, cmdName, ...cmdArgs)
    } catch(err : any) {
        console.error(err.message);
        process.exit(1);
    }
}

main();
