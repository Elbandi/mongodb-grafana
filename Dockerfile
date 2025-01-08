FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production --verbose

FROM node:20-alpine AS build

WORKDIR /app

COPY . /app

RUN set -x \
  && npm install --verbose \
  && npm run build

RUN rm -rf /app/dist/test

FROM node:20-alpine

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

COPY --from=build /app/dist /app/dist

COPY --from=build /app/package.json ./package.json

EXPOSE 3333

CMD ["npm", "run", "server"]
