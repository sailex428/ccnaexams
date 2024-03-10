FROM node:20-alpine

# image label
LABEL authors="elha"

# set workdirectory
WORKDIR /

# copy dependency files
COPY package.json ./
COPY package-lock.json ./

# install dependency
RUN npm install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm","start"]