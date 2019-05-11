#!/bin/bash
TAG=$(basename $PWD)
docker run -v `pwd`:"/app" -v `pwd`/../modules:"/modules" -v `pwd`/../data:"/data" ${TAG}
