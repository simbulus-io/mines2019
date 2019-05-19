
# Setting up and running Python within Docker Containers

## 1. Make Sure you have Docker setup and ready to run

First install docker-ce (the community edition / OSS version of docker).

See: https://docs.docker.com/install/

If you are in a Linux environment, you may want to add your user to the "docker" group so that you can run docker commands without SUDO. TO do this, and then _log out and log back in_:

```console
$  sudo usermod -aG docker $USER
```

Now test your docker installation by running the following. If it succeeds, you will see the output shown below.

```console
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
 $ docker run -it ubuntu console

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

```

## 2. Download or Build our base-python container image

You can download the image that I (milne) built from Docker Hub by doing the following:

```console
$  docker pull bmilne/python:1.1
$  docker tag bmilne/python:1.1 base-python

# NOTE: depending on your OS and setup, you may need to sudo the commands above, i.e.
$  sudo docker pull bmilne/python:1.1
$  sudo docker tag bmilne/python:1.1 base-python
```

* The first command will download the image I built and tagged as bmilne/python:1.1 on Docker Hub.
* The second command will tag this image locally as 'base-python' (the tag used in building other derived images locally.

Or you can build an image yourself by:

```console
$  cd python/docker/base-python
$  ./build
$  
```

The build script will build the image and tag it as 'base-python' in your local docker image repo.


## 3. Build and Run our "simple" test-app

This will run a python script (app.py) to print pi to double floating-pint precision and again to 300 digits
```console
$  cd ../simple
$  ./build
$  ./run
3.141592653589793
3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127
```

Here is the simple/app.py script that these commands just ran in a docker container. Try modifying it and repeating the ./run command:


```python
import numpy as np
from mpmath import mp

print(np.pi)

mp.dps=300;
print(mp.pi)
```

## 4. Setup and Run a New Project

To create a new Python app project, run the following commands (with whatever name you like for "my-proj-name."

```console
$  cd ../  # to python/docker
$  tools/setup_project.sh my-proj-name
$  cd my-proj-name
$  ./build
$  edit app.py
$  ./run
```

## 5. Build and Run the Jupyter Notebook setup

First you need to bring up the python container that will run the Jupyter server:

```console
$  cd jupyter-server
$  ./build
# <snip>
$  ./run
# <snip>
spawn jupyter notebook password
Enter password: 
Verify password: 
[NotebookPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_notebook_config.json
[TrustNotebookApp] Writing notebook-signing key to /root/.local/share/jupyter/notebook_secret
Signing notebook: /root/notebooks/Basic.ipynb
Signing notebook: /root/notebooks/pdf-to-image.ipynb
[I 01:01:33.421 NotebookApp] Writing notebook server cookie secret to /root/.local/share/jupyter/runtime/notebook_cookie_secret
[I 01:01:36.449 NotebookApp] Serving notebooks from local directory: /root/notebooks
[I 01:01:36.449 NotebookApp] The Jupyter Notebook is running at:
[I 01:01:36.449 NotebookApp] http://172.17.0.2:80/
[I 01:01:36.450 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[I 01:11:05.414 NotebookApp] 302 GET / (100.115.92.25) 11.17ms
[I 01:11:05.455 NotebookApp] 302 GET /tree? (100.115.92.25) 18.66ms
[W 01:11:08.362 NotebookApp] Not allowing login redirect to '/tree?'
[I 01:11:08.368 NotebookApp] 302 POST /login?next=%2Ftree%3F (100.115.92.25) 19.08ms
[I 01:11:08.400 NotebookApp] 302 GET / (100.115.92.25) 1.58ms
[I 01:11:18.600 NotebookApp] Kernel started: 58b67743-9ab7-407f-9db8-9b914ebbd87a
# <snip>
```
Next, find the ip address where you can conect to the Jupyter Notebook Server that you just started. It may be available at the address listed in the startup output -- e.g. the http://172.17.0.2 address in the example above. (On Linux this address should work, on other OSes the routing may not be setup to get to this virtual machine address.) If you can't get to that address, the server is also connected to port 8900 on the localhost where it is running. That address could be http://localhost:8900/ or http://127.0.0.1:8900/. Or, when I (milne) got this setup working on my chromebook, I had to first find the ip address for the Linux (beta) VM, via "hostname -I," and then found Jupyter at http://100.115.92.196:8900

```console
brentmilne@penguin:~/mines2019/python/docker$ hostname -I
172.17.0.1 100.115.92.196 
```

Once you find the Jupyter server, the password is *woot*. Try running and modifying the two existing notebook examples. One is called Basic and the other is called pdf-to-image.
