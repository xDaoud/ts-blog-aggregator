import { setUser, getUser } from "../config.js";
import { createUser, getUserByName, deleteAllUsers, getUsers } from "../db/queries/users.js";

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("username expected!");
    }
    const username = args[0];
    if (await getUserByName(username)) {
        throw new Error("The username already exists!");
    }
    await createUser(username);
    setUser(username);
    console.log(username + " Registered!");
}

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("username expected!");
    }
    const username = args[0];
    if (!await getUserByName(username)) {
        throw new Error("User is not registered!");
    }
    setUser(username);
    console.log(username + " logged in!");
}

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const result = await getUsers();
    if (!result) {
        throw new Error("There are no registered users!");
    }
    for (const user of result) {
        if (user.name === getUser()) {
            console.log(`* ${user.name} (current)`);
            continue;
        }
        console.log(`* ${user.name}`);
    }
}

export async function handleReset(cmdName: string, ...args: string[]): Promise<void> {
    try {
        await deleteAllUsers();
    } catch (err) {
        console.error(err, "Reset didn't secceed!")
    }
    console.log("reset succeeded!");
}
