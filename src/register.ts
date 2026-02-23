import { setUser } from "./config.js";
import { createUser, getUserByName } from "./db/queries/users.js";

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void>{
    if(args.length === 0){
        throw new Error("username expected!");
    }
    const username = args[0];
    if(await getUserByName(username)){
        throw new Error("The username already exists!");
    }
    await createUser(username);
    setUser(username);
    console.log(username + " Registered!");
}