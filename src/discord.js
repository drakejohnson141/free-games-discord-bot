import fetch from "node-fetch";

export async function sendToDiscord(webhookUrl, message) {
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  });
}
