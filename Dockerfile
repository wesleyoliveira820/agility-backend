FROM node:alpine

LABEL maintainer="wesleyoliveiradeveloper@gmail.com" \
      description="Task manager platform API image docker" \
      version="1.2.0"

WORKDIR /usr/app/

COPY package.json .
COPY yarn.lock .

RUN npm install -g @adonisjs/cli
RUN yarn install

COPY . .

EXPOSE 3333

EXPOSE 9229
