FROM node:24 AS test

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm test


FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY --from=test /usr/src/app  /usr/src/app

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build 


FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html