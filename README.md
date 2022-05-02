# Dockery(多颗粒)

Dockery(多颗粒) provides examples of building docker images mainly in two areas: 
* Examples for building dedicated/edged images that the community hasn't supported yet, for example, `ruby 3 + rails 7 + postgres 14`.
* Examples for building image in China due to network lags, for example, `nextjs base`

Naming this project with `Dockerfy` because it sounds cute, and its phonetic translation in Chinese `多颗粒` directly implies that this project is the aggregation of a variety of practices.

Hope `Dockerfy` improve your dev team's productivity, any pull request is welcome for building image not included.

## Get started
Most of the scripts are written in [zx](https://github.com/google/zx) which should be installed before building your own:
```sh
# building ruby image as an example
~$ cd ruby 
~$ ./build.mjs -h
Usage:
./build.mjs [--version [3.1.2|3.2|2.7|...]] [-h]
~$ ./build.mjs --version 3.1.2
```
## Images supported
| Image                          | OS     | Repo                | Tags      |
| -------------------------------| ------ | ------------------- | --------- |
| [next.js](./nextjs)            | alpine | ruilisi/nextjs-base | 12.1.0    |
| [ruby 3 + postgres 14](./ruby) | debian | ruilisi/ruby        | 3.1.2,3.2 |
| [golang](./golang)              | *     | ruilisi/golang      | *         |

## Detailed explanation for images
#### Nextjs
Building docker image of nextjs based project with alpine base in China is complicated, cause the following issues need to be resolved:
* Globally install module `sharp`.
* Before installing module `sharp`, you have to install libraries: `vips-dev fftw-dev`, otherwise it won't compile.
* The above libraries can only be installed through repository `https://dl-3.alpinelinux.org/alpine/edge/testing/` currently, and proxy is needed when accessing this repo in some areas.
* Since proxy is only required during some of the steps, an agile way of doing this is needed (providing the proxy address in host machine and let the container aware of it).

Other tools and configs are also provided in order to make later image building faster and make image size smaller:
* Use an alpine mirror inside China.
* Config taobao npm registry.

Use it in your `Dockerfile`:
```Dockerfile
FROM ccr.ccs.tencentyun.com/ruilisi-pub/nextjs-base:VERSION
...
COPY next.config.js ./
COPY public ./public
COPY package.json ./package.json
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY .env.production ./.env.production
```

#### ruby 3 + postgres 14
Image for ruby 3 and image for postgres 14 are all available, however, combining both is tedious.

This image simply gives you newest experience with `ruby & postgres` without pain!

#### Golang
Simply wraps offical image with `alpine source` and `goproxy` suitable for Chinese developers.
