#!/usr/bin/env zx

const HOST_IP = /src *(.*)/g.exec(await $`ip route get 8.8.8.8`)[1];
const PROXY_PORT = "9119";
const PROXY = `http://${HOST_IP}:${PROXY_PORT}`;
const TAG = "12.1.0";
const NAME = `nextjs-base:${TAG}`;
console.info(`docker build --build-arg PROXY=${PROXY} -t ${NAME} .`);
await $`docker build --build-arg PROXY=${PROXY} -t ${NAME} .`;
await $`docker tag ${NAME} ruilisi/${NAME}`;
await $`docker push ruilisi/${NAME}`;
