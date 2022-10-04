FROM registry.gitlab.com/token-x/node:14-alpine-builder AS builder

WORKDIR /workspace

ARG YARN_REGISTRY=https://registry.yarnpkg.com/
ARG NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
ARG NG_BUILD_CONFIG=production

COPY . .

RUN yarn config get registry
RUN npm config get registry
RUN npm ci --legacy-peer-deps
RUN npx ng build -c $NG_BUILD_CONFIG
RUN ls -l ./dist

FROM registry.gitlab.com/token-x/nginx:1.23-alpine

COPY --chown=nginx:nginx --from=builder /workspace/dist /usr/share/nginx/html/
