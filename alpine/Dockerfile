ARG TAG=3.15
FROM alpine:${TAG} AS build-env
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
