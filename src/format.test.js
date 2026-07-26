import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLine } from "./format.js";

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
  assert.equal(formatLine({ sticker: {} }, at), null);
  assert.equal(formatLine({ text: "   " }, at), null);
});

test("войс с подписью всё равно войс", () => {
  assert.match(formatLine({ voice: { file_id: "X" }, caption: "к" }, at), /\(voice\)/);
});
