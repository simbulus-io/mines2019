#!/bin/sh
./build.sh
tsc -w &
nodemon bin/lib/bootstrap.js 

