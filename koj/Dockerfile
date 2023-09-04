FROM node:lts

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y default-jre
RUN apt-get install -y default-jdk
RUN npm install -g npm@latest

RUN git clone https://github.com/amkorousagi/KOJ
WORKDIR /KOJ/koj
RUN npm install
RUN npm install -g nodemon

RUN ulimit -v 256000
RUN ulimit -t 2
RUN ulimit -u 0

EXPOSE 3014
CMD nodemon start
