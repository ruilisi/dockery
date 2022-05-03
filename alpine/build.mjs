#!/usr/bin/env zx

const NAME = "alpine";

if (argv.h) {
  console.info(`Usage:
./build.mjs [--tag [Any tag of official alpine image] [-h]`);
  process.exit();
}

const { tag } = argv;
await $`docker build --build-arg TAG=${tag} -f Dockerfile -t ${NAME} .`;
await $`docker tag ${NAME} ruilisi/${NAME}:${tag};docker push ruilisi/${NAME}:${tag}`;
