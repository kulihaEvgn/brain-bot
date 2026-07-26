/** Ровно то, что функции нужно от сообщения — не весь grammy-шный Message. */
type Incoming = {
  text?: string;
  caption?: string;
  voice?: { file_id: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

const stamp = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

/**
 * Строка для raw.md, либо null если ловить нечего (стикер, картинка без подписи).
 * Переносы строк превращаются в отступ, чтобы не рвать пункт markdown-списка.
 */
export function formatLine(msg: Incoming, now = new Date()): string | null {
  const [source, raw]: [string, string | undefined] = msg.voice
    ? ["voice", `file_id:${msg.voice.file_id}`]
    : msg.text
      ? ["text", msg.text]
      : ["caption", msg.caption];

  const body = raw?.trim();
  if (!body) return null;
  // /start и прочие команды — не мысли. Путь вида /etc/hosts под правило не попадает.
  if (source !== "voice" && /^\/\w+(@\w+)?(\s|$)/.test(body)) return null;

  return `- [ ] ${stamp(now)} (${source}) ${body.replace(/\n/g, "\n  ")}\n`;
}
