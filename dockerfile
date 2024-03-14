FROM oven/bun:latest

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential python3

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun run build

EXPOSE 8001

CMD ["bun", "run", "start"]