import { deleteAllUsers } from "./db/queries/users";

export async function handleReset(cmdName: string, ...args: string[]): Promise<void> {
    try {
        await deleteAllUsers();
    } catch (err) {
        console.error(err, "Reset didn't secceed!")
    }
    console.log("reset succeeded!");
}