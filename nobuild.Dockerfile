FROM node:10

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY server.js next.config.js ./
COPY .next ./.next
COPY public ./public

EXPOSE 8080

ENV PORT 8080

ENTRYPOINT yarn start
