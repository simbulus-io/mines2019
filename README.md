# Shared Repository For Mines Field Session 2019

### Structure

```api``` - node/express app (REST endpoints)

```app``` - vue SPWA (single page web app for client UI)

```stack/docker``` - Docker environemnt setup and `dk` command line interface

### Getting started

#### Minimal requirements as of 5/16/19.

* docker & docker-compose
* ruby 2.x
* node 8.x
* yarn (npm install -g yarn)

Notes:

You need ruby for the dk command line which is just a convenience CLI (command line interface) for wrapping common docker/mongo operations and commands (feel free to add you own commands to the dk script).

We are in the process of setting up a docker container to run node but in the mean time you can run the express/API and the vue API from you host machine if you have node and yarn installed locally on your machine.

```
# start the docker containers
cd stack/docker
./dk up
```

Following the instructions in the api/app READMEs

[Feedback API README](./api/feedback_api)

[Content API README](./api/content_api)

[Feedback App README](./app/feedback)

```
