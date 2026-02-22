import { setUser, readConfig } from "./config.js";
function main() {
    setUser("Daoud");
    const cfg = readConfig();
    console.log("Config: ");
    console.log(cfg);
}

main();
