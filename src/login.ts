import { setUser } from "./config.js";
import { getUserByName } from "./db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void>{
    if(args.length === 0){
        throw new Error("username expected!");
    }
    const username = args[0];
    if(!await getUserByName(username)){
        throw new Error("User is not registered!");
    }
    setUser(username);
    console.log(username + " logged in!");
}