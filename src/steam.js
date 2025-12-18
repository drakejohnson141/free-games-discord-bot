import fetch from "node-fetch";
export async function getSteamDeals() {
  const res = await fetch("https://store.steampowered.com/api/featuredcategories");
  const json = await res.json();
  return json.specials.items
    .filter(g => g.discount_percent >= 80)
    .map(g => ({ id: g.id, title: g.name, url: `https://store.steampowered.com/app/${g.id}/` }));
}