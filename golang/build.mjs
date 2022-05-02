#!/usr/bin/env zx

if (argv.h) {
  console.info(`Usage:
./build.mjs [--tag [Any tag of official golang image] [-h]`);
  process.exit();
}
const { tag } = argv;
const NAME = "golang";
await $`docker build --build-arg TAG=${tag} -f Dockerfile -t ${NAME} .`;
await $`docker tag ${NAME} ruilisi/${NAME}:${tag};docker push ruilisi/${NAME}:${tag}`;
