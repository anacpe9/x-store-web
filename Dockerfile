FROM registry.gitlab.com/token-x/node:14-alpine-builder AS builder
LABEL maintainer="Anucha Nualsi <ana.cpe9@gmail.com>"

WORKDIR /workspace

ARG YARN_REGISTRY=https://registry.yarnpkg.com/
ARG NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
ARG NG_BUILD_CONFIG=production

COPY . .

RUN apk add --update --no-cache git openssh openssh-client
RUN git config --global url."https://github".insteadOf ssh://git@github
RUN yarn config get registry
RUN npm config get registry
RUN npm ci --legacy-peer-deps
RUN npx ng build -c $NG_BUILD_CONFIG
RUN ls -l ./dist

FROM registry.gitlab.com/token-x/nginx:1.23-alpine
LABEL maintainer="Anucha Nualsi <ana.cpe9@gmail.com>"

COPY --chown=nginx:nginx --from=builder /workspace/default.conf /etc/nginx/conf.d/
COPY --chown=nginx:nginx --from=builder /workspace/dist /usr/share/nginx/html/
