import fetch from "node-fetch";
export async function getEpicFreeGames() {
  const res = await fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions");
  const json = await res.json();
  return json.data.Catalog.searchStore.elements
    .filter(g => g.promotions?.promotionalOffers?.length)
    .map(g => ({ id: g.id, title: g.title, url: `https://store.epicgames.com/p/${g.productSlug}` }));
}