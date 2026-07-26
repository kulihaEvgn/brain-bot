import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLine } from "./format.ts";

const at = new Date(2026, 6, 26, 14, 30);

test("текст", () => {
  assert.equal(formatLine({ text: "мысль" }, at), "- [ ] 2026-07-26 14:30 (text) мысль\n");
});

test("войс — file_id, без транскрипции", () => {
  assert.equal(
    formatLine({ voice: { file_id: "AwACAgQ" } }, at),
    "- [ ] 2026-07-26 14:30 (voice) file_id:AwACAgQ\n",
  );
});

test("подпись к картинке", () => {
  assert.equal(formatLine({ caption: "подпись" }, at), "- [ ] 2026-07-26 14:30 (caption) подпись\n");
});

test("многострочное не рвёт пункт списка", () => {
  assert.equal(
    formatLine({ text: "первая\nвторая" }, at),
    "- [ ] 2026-07-26 14:30 (text) первая\n  вторая\n",
  );
});

test("нечего ловить — null", () => {
  assert.equal(formatLine({}, at), null); // стикер: ни text, ни caption, ни voice
  assert.equal(formatLine({ text: "   " }, at), null);
});

test("команды не ловятся", () => {
  assert.equal(formatLine({ text: "/start" }, at), null);
  assert.equal(formatLine({ text: "/help меня" }, at), null);
});

test("путь со слешем — это мысль, не команда", () => {
  assert.equal(formatLine({ text: "/etc/hosts правится руками" }, at), "- [ ] 2026-07-26 14:30 (text) /etc/hosts правится руками\n");
});

test("войс с подписью всё равно войс", () => {
  assert.equal(
    formatLine({ voice: { file_id: "X" }, caption: "к" }, at),
    "- [ ] 2026-07-26 14:30 (voice) file_id:X\n",
  );
});
