import { setUser } from "./config.js";

export function handlerLogin(cmdName: string, ...args: string[]){
    if(args.length === 0){
        throw new Error("username expected!");
    }
    const username = args[0];
    setUser(username);
    console.log(username + " logged in!");
}