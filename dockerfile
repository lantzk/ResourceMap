FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install tailwindcss autoprefixer
RUN npm install -D ts-node

RUN npm run build

EXPOSE 8001

CMD ["npx", "ts-node", "server/index.ts"]