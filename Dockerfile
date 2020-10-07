FROM node:12-alpine as build-server
RUN apk add --no-cache git bash gettext
ENV SKIP_PREFLIGHT_CHECK=true

WORKDIR /usr/src/server

# Install packages
COPY server/package.json package.json
COPY server/yarn.lock yarn.lock

RUN yarn

COPY server .
RUN yarn build

ENTRYPOINT [ "yarn" ]


FROM node:12-alpine as build-client
RUN apk add --no-cache git
ENV SKIP_PREFLIGHT_CHECK=true

WORKDIR /usr/src/client

COPY client/package.json package.json
COPY client/yarn.lock yarn.lock
RUN yarn

COPY client .
RUN yarn build

ENTRYPOINT [ "yarn" ]


FROM node:12-alpine as stage-server
RUN apk add --no-cache git jq gettext
ENV NODE_ENV=production
WORKDIR /usr/src/server

COPY --from=build-server /usr/src/server .


# prune dev deps https://github.com/yarnpkg/yarn/issues/696
RUN yarn remove $(cat package.json | jq -r '.devDependencies | keys | join(" ")')


FROM node:12-alpine as stage-client
ENV NODE_ENV=production
WORKDIR /usr/src/client

COPY --from=build-client /usr/src/client .
# prune dev deps
RUN rm -rf node_modules



FROM node:12-alpine as server
ENV NODE_ENV=production
ENV PORT=3011

# Copy the React Front End build files
WORKDIR /usr/src
COPY --from=stage-server /usr/src/server .
COPY --from=stage-client /usr/src/client/build ./dist/client

# Start the server
EXPOSE 3011
CMD [ "node", "dist/main.js" ]
