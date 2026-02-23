import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../config";

const config = readConfig();
console.log("Connecting to DB:", config.dbUrl);
const conn = postgres(config.dbUrl, {
    ssl: false,
    connect_timeout: 5,
});
export const db = drizzle(conn, { schema });
