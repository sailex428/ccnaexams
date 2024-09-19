FROM node:20-alpine
LABEL authors="sailex"

WORKDIR ./frontend

ENV BACKEND_URI=http://backend:10052/api

ENV TZ=Europe/Berlin

COPY . .

RUN npm install

RUN npm run build

EXPOSE 10052

CMD ["npm","start"]