FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/app.js"]
