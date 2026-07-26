import { Bot } from "grammy";
import { appendFile } from "node:fs/promises";
import { join } from "node:path";
import { formatLine } from "./format.js";

const { BOT_TOKEN, OWNER_ID, VAULT_PATH } = process.env;
if (!BOT_TOKEN || !OWNER_ID || !VAULT_PATH) {
  throw new Error("нужны BOT_TOKEN, OWNER_ID, VAULT_PATH (см. .env.example)");
}

const raw = join(VAULT_PATH, "raw.md");
const bot = new Bot(BOT_TOKEN);

bot.on("message", async (ctx) => {
  // Токен = публичный адрес: без этой проверки в vault пишет кто угодно.
  if (ctx.from.id !== Number(OWNER_ID)) return;

  const line = formatLine(ctx.message);
  if (!line) return;

  await appendFile(raw, line);
  await ctx.react("👍");
});

bot.catch((err) => console.error("bot error:", err.error ?? err));

bot.start({ onStart: () => console.log(`ловлю → ${raw}`) });
