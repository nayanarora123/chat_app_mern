FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add bash

COPY package*.json ./
RUN npm install --silent

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000