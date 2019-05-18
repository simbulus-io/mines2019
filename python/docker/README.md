
# Setting up and running Python within Docker Containers

## 1. Make Sure you have Docker setup and ready to run

First install docker-ce (the community edition / OSS version of docker).

See: https://docs.docker.com/install/

If you are in a Linux environment, you may want to add your user to the "docker" group so that you can run docker commands without SUDO. TO do this, and then _log out and log back in_:

```bash
$  sudo usermod -aG docker $USER
```

Now test your docker installation by running the following. If it succeeds, you will see the output shown below.

```bash
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

```

## 2. Download or Build our base-python container image

You can download the image that I (milne) built from Docker Hub by doing the following:

```bash
$  docker pull bmilne/python:1.1
$  docker tag bmilne/python:1.1 base-python

# NOTE: depending on your OS and setup, you may need to sudo the commands above, i.e.
$  sudo docker pull bmilne/python:1.1
$  sudo docker tag bmilne/python:1.1 base-python
```

* The first command will download the image I built and tagged as bmilne/python:1.1 on Docker Hub.
* The second command will tag this image locally as 'base-python' (the tag used in building other derived images locally.

Or you can build an image yourself by:

```bash
$  cd python/docker/base-python
$  ./build
$  
```

The build script will build the image and tag it as 'base-python' in your local docker image repo.


