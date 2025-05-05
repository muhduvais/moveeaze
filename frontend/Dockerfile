FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force
RUN npm install -g typescript

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
