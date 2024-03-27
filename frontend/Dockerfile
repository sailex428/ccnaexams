FROM node:20-alpine

# image label
LABEL authors="sailex"

# set workdirectory
WORKDIR /

# set env for db
ENV MONGODB_URI=$MONGODB_URI

# copy dependency files
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

# copy complete app
COPY . ./

# build app
RUN npm run build

EXPOSE 3000

# start app
CMD ["npm","start"]