#!/usr/bin/env zsh
set -e
# Get host ip which can be accessed during docker build
HOST_IP=`ip route get 8.8.8.8 | sed -n '/src/{s/.*src *\([^ ]*\).*/\1/p;q}'`
/src *(.*)/g.exec('8.8.8.8 via 192.168.2.1 dev en0  src 192.168.2.27')[1]

# Change your proxy port here
PROXY_PORT=9119
PROXY=http://$HOST_IP:$PROXY_PORT
TAG=12.1.0
NAME=nextjs-base:$TAG
docker build --build-arg PROXY=$PROXY -t $NAME .
docker tag $NAME ruilisi/$NAME
docker push ruilisi/$NAME
