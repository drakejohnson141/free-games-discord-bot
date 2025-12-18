import fs from "fs";
import { sendToDiscord } from "./src/discord.js";
import { getEpicFreeGames } from "./src/epic.js";
import { getSteamDeals } from "./src/steam.js";
import { getGogDeals } from "./src/gog.js";
import { getLegacyGames } from "./src/legacy.js";

const state = JSON.parse(fs.readFileSync("state.json"));
await sendToDiscord("✅ Test message from GitHub Actions");

async function run() {
  await sendToDiscord("✅ Test message from GitHub Actions");
  const games = [
    ...(await getEpicFreeGames()),
    ...(await getSteamDeals()),
    ...(await getGogDeals()),
    ...getLegacyGames()
  ];

  for (const game of games) {
    if (state.sent.includes(game.id)) continue;
    await sendToDiscord(`🎮 **${game.title}**\n🔗 ${game.url}`);
    state.sent.push(game.id);
  }

  fs.writeFileSync("state.json", JSON.stringify(state, null, 2));
}
run();
