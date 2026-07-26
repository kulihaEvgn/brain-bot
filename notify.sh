#!/bin/sh
# Отправить сообщение владельцу. Токен и адресат — из того же .env, что у бота.
# Использование: ./notify.sh "текст дайджеста"
set -eu
cd "$(dirname "$0")"
. ./.env

curl -sS --fail "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
  --data-urlencode "chat_id=$OWNER_ID" \
  --data-urlencode "text=$1" > /dev/null
