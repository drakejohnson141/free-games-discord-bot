import fs from "fs";
import { sendToDiscord } from "./src/discord.js";
import { getEpicFreeGames } from "./src/epic.js";
import { getSteamDeals } from "./src/steam.js";
import { getGogDeals } from "./src/gog.js";
import { getLegacyGames } from "./src/legacy.js";

// Load sent state
const stateFile = "state.json";
let state = { sent: [] };

if (fs.existsSync(stateFile)) {
  state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
}

// ✅ THIS FUNCTION WAS MISSING
async function processGames(games, webhook, storeName) {
  if (!webhook) {
    console.log(`⚠️ No webhook for ${storeName}`);
    return;
  }

  for (const game of games) {
    if (state.sent.includes(game.id)) continue;

    await sendToDiscord(
      webhook,
      `🎮 **${game.title}**\n🏪 ${storeName}\n🔗 ${game.url}`
    );

    state.sent.push(game.id);
  }
}

async function run() {
  console.log("🔍 Checking free games...");

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

  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log("✅ Done");
}

run();
