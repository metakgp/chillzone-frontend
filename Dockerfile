FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --verbose

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

