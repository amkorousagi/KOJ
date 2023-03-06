FROM node:lts

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN npm install -g npm@latest

RUN git clone https://github.com/amkorousagi/KOJ
WORKDIR /KOJ/koj
RUN npm install --force
RUN npm install -g nodemon

EXPOSE 3014
CMD nodemon start
