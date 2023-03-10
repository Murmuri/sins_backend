FROM node:18

RUN mkdir /src
WORKDIR /src

COPY .env ./
COPY *.json ./
COPY src/ ./src/

EXPOSE 3000

RUN npm install