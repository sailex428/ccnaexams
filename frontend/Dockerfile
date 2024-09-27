FROM node:20-alpine
LABEL authors="sailex"

WORKDIR /frontend

ENV TZ=Europe/Berlin

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]