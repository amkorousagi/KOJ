FROM node:18.17.1

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN npm install -g npm@latest

COPY . /KOJ
WORKDIR /KOJ/back
RUN npm install --force
RUN npm install -g nodemon

EXPOSE 3012
CMD npm run dev
