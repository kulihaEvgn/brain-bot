const pad = (n) => String(n).padStart(2, "0");

const stamp = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

/**
 * Строка для raw.md, либо null если ловить нечего (стикер, картинка без подписи).
 * Переносы строк превращаются в отступ, чтобы не рвать пункт markdown-списка.
 */
export function formatLine(msg, now = new Date()) {
  const [source, raw] = msg.voice
    ? ["voice", `file_id:${msg.voice.file_id}`]
    : msg.text
      ? ["text", msg.text]
      : ["caption", msg.caption];

  const body = raw?.trim();
  if (!body) return null;

  return `- [ ] ${stamp(now)} (${source}) ${body.replace(/\n/g, "\n  ")}\n`;
}
