FROM node:16-alpine AS node_base
ENV NODE_ENV production
ENV NEXT_SHARP_PATH /usr/local/share/.config/yarn/global/node_modules/sharp
ENV NODE_OPTIONS="--max-old-space-size=8192"
WORKDIR /app
ARG PROXY
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat && \
    http_proxy=${PROXY} https_proxy=${PROXY} apk add vips-dev fftw-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ && \
    yarn config set registry "https://registry.npm.taobao.org" && \
    http_proxy=${PROXY} https_proxy=${PROXY} yarn global add sharp --no-cache

RUN yarn config set sentrycli_cdnurl https://cdn.npm.taobao.org/dist/sentry-cli
EXPOSE 80
ENV PORT 80
CMD ["node", "server.js"]
