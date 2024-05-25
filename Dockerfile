FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add bash

RUN npm i pm2 -g

COPY package*.json ./

COPY client/package*.json client/
RUN npm install --prefix client

COPY server/package*.json server/
RUN npm install --prefix server

COPY client/ client/
RUN cd client && npm run build

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8080