FROM node:20-alpine as builder

WORKDIR /app

RUN apk add make g++ python3

COPY package.json yarn.lock ./
COPY .yarn ./

RUN yarn install

COPY . .

RUN yarn build

RUN npx prisma generate

FROM node:20-alpine as production

WORKDIR /app

RUN yarn global add @prisma/client

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start"]
