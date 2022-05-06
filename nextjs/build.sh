#!/usr/bin/env zsh
set -e
# Get host ip which can be accessed during docker build
HOST_IP=`ip route get 8.8.8.8 | sed -n '/src/{s/.*src *\([^ ]*\).*/\1/p;q}'`
# Change your proxy port here
PROXY_PORT=9119
PROXY=http://$HOST_IP:$PROXY_PORT
TAG=12.1.0
NAME=nextjs-base:$TAG
docker build --build-arg PROXY=$PROXY -t $NAME .
docker tag $NAME ccr.ccs.tencentyun.com/ruilisi-pub/$NAME
docker push ccr.ccs.tencentyun.com/ruilisi-pub/$NAME
