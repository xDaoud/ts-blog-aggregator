import os from "os";
import fs, { write } from "fs";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName?: string;
};

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    return validateConfig(parsed);
}

export function setUser(username: string): void {
    const cfg = readConfig();
    cfg.currentUserName = username;
    writeConfig(cfg);
}

export function getUser() {
    const cfg = readConfig()
    if(!cfg.currentUserName){
        throw new Error("no logged in user");
    }
    return cfg.currentUserName;
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const filePath = getConfigFilePath();
    const json = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
}

function validateConfig(raw: any): Config {
    if(!raw || typeof raw !== "object") {
        throw new Error("not an object");
    }
    if(typeof raw.db_url !== "string") {
        throw new Error("db_url not a string ot missing");
    }
    if(raw.current_user_name !== undefined && typeof raw.current_user_name !== "string") {
        throw new Error("current_user_name must be a string");
    }
    return {
        dbUrl: raw.db_url,
        currentUserName: raw.current_user_name,
    };
}