FROM node:8.16-stretch-slim as node-stage-0

COPY ./packages.txt /packages.txt

RUN apt-get update -yy
RUN apt-get install -yy `cat /packages.txt`
CMD tail -f /dev/null

FROM node-stage-0 as node-stage-1

WORKDIR /root
COPY ./package.json /root/package.json
RUN yarn install
RUN yarn global add typescript
CMD tail -f /dev/null
