# brain-bot

Ловец мыслей: сообщение в Telegram → строка в `raw.md` соседнего vault.
Тупой по замыслу — не разбирает и не чистит, этим занимается Claude Code в vault.

Long polling: пока бота нет в сети, Telegram копит сообщения и отдаёт всё разом
при возвращении. Ноутбук можно закрывать.

## Запуск

```
cp .env.example .env   # вписать BOT_TOKEN и OWNER_ID
npm install
npm start
```

`BOT_TOKEN` — у [@BotFather](https://t.me/BotFather), `OWNER_ID` — у [@userinfobot](https://t.me/userinfobot).
Сообщения не от `OWNER_ID` игнорируются: токен бота — публичный адрес.

Долетело — бот ставит 👍 на сообщение.

## Тесты

```
npm test
```

## Docker

```
docker build -t brain-bot .
docker run -d --restart always --name brain-bot \
  -e BOT_TOKEN=... -e OWNER_ID=... -e VAULT_PATH=/vault \
  -v /absolute/path/to/second-brain:/vault \
  brain-bot
```

`--restart always` + «Start at login» в Docker Desktop = бот переживает ребут.
