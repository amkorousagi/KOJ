FROM node:18.17.1

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y vim
RUN npm install -g npm@10.1.0

RUN git clone https://github.com/amkorousagi/KOJ
WORKDIR /KOJ/front
RUN npm install --force

ENV PORT=3011
ENV HOST=0.0.0.0
EXPOSE 3011
CMD npm start
