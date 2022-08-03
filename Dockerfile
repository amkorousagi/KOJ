FROM ubuntu:20.04

MAINTAINER hasmi5452@gmail.com
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y npm

RUN mkdir psc
WORKDIR /psc

EXPOSE 10004
