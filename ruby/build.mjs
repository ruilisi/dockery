#!/usr/bin/env zx

if (argv.h) {
  console.info(`Usage:
./build.mjs [--version [3.1.2|3.2|2.7|...]] [-h]`);
  process.exit();
}
console.info("shit");
const VERSION = argv.version;
const NAME = "ruby-base";
const [major] = VERSION.split(".");
await $`docker build --build-arg ruby_version=${VERSION} -f Dockerfile-${major}.base -t ${NAME} .`;
await $`docker tag ${NAME} ruilisi/${NAME}:${VERSION};docker push ruilisi/${NAME}:${VERSION}`;
