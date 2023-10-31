FROM node:18.17.1

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y default-jre
RUN apt-get install -y default-jdk
RUN npm install -g npm@latest

COPY . /KOJ
WORKDIR /KOJ/koj
RUN npm install --force
RUN npm install -g nodemon

RUN ulimit -v 256000
RUN ulimit -t 2
RUN ulimit -n 10

EXPOSE 3014
CMD nodemon start
