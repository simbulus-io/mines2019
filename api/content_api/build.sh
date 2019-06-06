#!/bin/sh

# set -e: any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e

yarn install

rm -rf dist
mkdir -p dist

# Typescript compiler
tsc

cp yarn.lock dist/.
cp default_env.yaml dist/.
cp -r src/public dist/.
cp default_config.yaml dist/config.yaml
