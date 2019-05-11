#!/bin/bash
TAG=$(basename $PWD)
IMAGE=$(docker ps | grep "$TAG" | cut -f 1 -d " ")
if [ -z "${IMAGE}" ] ; then
    echo No ${TAG} image running
    echo docker ps:
    docker ps
else
   docker kill ${IMAGE}
fi
