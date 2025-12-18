import fs from "fs";
import { sendToDiscord } from "./src/discord.js";
import { getEpicFreeGames } from "./src/epic.js";
import { getSteamDeals } from "./src/steam.js";
import { getGogDeals } from "./src/gog.js";
import { getLegacyGames } from "./src/legacy.js";

const state = JSON.parse(fs.readFileSync("state.json"));

async function run() {
  await processGames(
    await getEpicFreeGames(),
    process.env.DISCORD_WEBHOOK_EPIC,
    "Epic Games"
  );

  await processGames(
    await getSteamDeals(),
    process.env.DISCORD_WEBHOOK_STEAM,
    "Steam"
  );

  await processGames(
    await getGogDeals(),
    process.env.DISCORD_WEBHOOK_GOG,
    "GOG"
  );

  await processGames(
    getLegacyGames(),
    process.env.DISCORD_WEBHOOK_LEGACY,
    "Legacy Games"
  );

  fs.writeFileSync("state.json", JSON.stringify(state, null, 2));
}

run();
