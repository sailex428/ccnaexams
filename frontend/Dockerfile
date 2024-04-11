FROM node:20-alpine

# image label
LABEL authors="sailex"

# set workdirectory
WORKDIR /src/app

# set env for db
ENV BACKEND_URI=http://backend:8080/api

# copy dependency files
COPY package.json ./
COPY package-lock.json ./

# copy complete app
COPY . ./

# install dependencies
RUN npm install

EXPOSE 3000

# start app
CMD ["npm","start"]