FROM node:lts

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN npm install -g npm@latest

RUN git clone https://github.com/amkorousagi/KOJ
WORKDIR /KOJ/back
RUN npm install
RUN npm install -g nodemon

EXPOSE 3012
CMD npm run dev
