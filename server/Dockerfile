FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add bash
RUN npm i nodemon -g

COPY package*.json ./
RUN npm install

COPY . .

USER node

CMD [ "npm", "run", "watch" ]

EXPOSE 8000