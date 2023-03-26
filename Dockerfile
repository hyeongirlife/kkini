# base image
FROM node:16.13.2-alpine

RUN mkdir -p /var/app
# create app directory
WORKDIR /var/app

# copy package.json and yarn.lock
COPY package.json yarn.lock ./

# copy source code
COPY . .

# install dependencies
RUN yarn

# build the app
RUN yarn build

# expose the port
EXPOSE 8080

# start the app
CMD ["yarn", "start:prod"]