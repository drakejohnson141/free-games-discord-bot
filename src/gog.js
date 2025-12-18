import fetch from "node-fetch";
export async function getGogDeals() {
  const res = await fetch("https://www.gog.com/games/ajax/filtered?price=free");
  const json = await res.json();
  return json.products.map(g => ({ id: g.id, title: g.title, url: `https://www.gog.com/game/${g.slug}` }));
}