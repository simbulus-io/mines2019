This directory contains a docker-compose configuration that will run a webstack that includes the express-based api server, a mongo database, and a python coprocessor container. The container images are set to pull from pre-build images on docker hub (it is also possible to change the compose file so as to get the containers to load locally built images for the express server and the python coprocessor).

In addition to these containers, the compose file runs an nginx server that serves static content from the app/content/public directory (as /content/), from the www-static repo directory (as /static/), and from a temporary shared filesystem that is availble in all of the containers, mounted at /shared and served as /shared/.

Thus, any of the containers (e.g the python coprocessor) can write a file, e.g. /shared/foo/bar.png and that can be accessed from the server at http://localhost/shared/foo/bar.png

To bring up the stack, run Docker Compose:

```
docker-compose up
```

To restart one of the components, e.g. the coprocessor, run the following docker-compose command in this directory:

```
docker-compose restart coproc_1
```


