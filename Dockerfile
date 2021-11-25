FROM node:12 as BUILD

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY prismic.env .env

ENV NODE_ENV=production

# required for apollo client
# ENV PRISMIC_GRAPHQL_ENDPOINT=https://kids2.prismic.io/graphql

RUN npm run build

FROM node:12

WORKDIR /app

ENV NODE_ENV=production

# do notice that we are ignoring package-lock.json here
COPY --from=BUILD /app/package.json ./
RUN npm i

COPY --from=BUILD /app/server.js /app/next.config.js ./
COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public

EXPOSE 8080
ENV PORT 8080

ENTRYPOINT npm start
