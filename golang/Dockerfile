ARG TAG=1.18.1-alpine3.15
FROM golang:${TAG} AS build-env
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
ENV GOPROXY https://goproxy.cn,direct
