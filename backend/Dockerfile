# build stage
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

# install dependencies

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# production stage
FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY src/.env .env

RUN npm ci --production

COPY --from=build /usr/src/app/dist  /app/dist

EXPOSE 8080

CMD [ "node", "dist/server.js" ]