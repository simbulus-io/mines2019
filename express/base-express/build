#!/bin/bash
TAG=$(basename $PWD)
if [ -z "$1" ] ; then
    BASE=""
else
    BASE="--build-arg base=$1"
fi
echo Building Image ${TAG}
echo docker build $BASE --tag=${TAG} .
docker build $BASE --tag=${TAG} .
