FROM node:16.13-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run build

# remove dev dependencies
RUN npm prune --production

FROM alpine:3.15

WORKDIR /usr/src/app

# copy from build image
COPY --from=build /usr/src/app/dist .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ../package.json

RUN \
    apk add --update nodejs --no-cache &&\
    mkdir /tmp/backup

EXPOSE 80

CMD ["node", "index.js"]
