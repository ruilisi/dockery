#!/usr/bin/env zx

if (argv.h) {
  console.info(`Usage:
./build.mjs [--tag [Any tag of official golang image] [--ci] [-h]`);
  process.exit();
}

let suffix = "";
if (argv.ci) {
  suffix = "-ci";
}
let dockerfile = "Dockerfile" + suffix;
const { tag } = argv;
const NAME = "golang" + suffix;
await $`docker build --build-arg TAG=${tag} -f ${dockerfile} -t ${NAME} .`;
await $`docker tag ${NAME} ruilisi/${NAME}:${tag};docker push ruilisi/${NAME}:${tag}`;
