import { getUser } from "./config.js";
import { getUsers } from "./db/queries/users.js";

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const result = await getUsers();
    if(!result){
        throw new Error("There are no registered users!");
    }
    for(const user of result){
        if(user.name === getUser()){
            console.log(`* ${user.name} (current)`);
            continue;
        }
        console.log(`* ${user.name}`);
    }
}