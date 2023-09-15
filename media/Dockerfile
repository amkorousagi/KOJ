FROM node:lts

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN npm install -g npm@latest

COPY ../KOJ /KOJ
WORKDIR /KOJ/media
RUN npm install
RUN npm install -g nodemon

EXPOSE 3013
CMD nodemon start
