FROM node:17-alpine as node_base

WORKDIR /home/node

RUN apk update


# dev
FROM node_base as development

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install