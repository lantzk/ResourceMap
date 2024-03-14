FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install tailwindcss autoprefixer
RUN npm install -D typescript

RUN npm run build

# Install SQLite3 dependencies
RUN apt-get update && apt-get install -y python3 make g++

# Rebuild sqlite3 from source
RUN npm rebuild sqlite3 --build-from-source

# Copy index.html to the dist/server directory
RUN mkdir -p dist/server && cp server/index.html dist/server/

EXPOSE 8001

CMD ["npm", "start"]