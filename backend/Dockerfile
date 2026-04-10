FROM node:20-alpine
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

# Script to run migrations and start server
CMD npx prisma migrate deploy && npm run start
