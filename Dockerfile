FROM node:24-alpine
# Без tzdata alpine знает только UTC и молча игнорирует TZ — время в raw.md уедет.
RUN apk add --no-cache tzdata
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
CMD ["node", "src/bot.ts"]
