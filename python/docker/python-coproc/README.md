## Python Coprocessor: Container Setup and Job Runner

The code in this directory does two things: 1) it build out a docker container that can run the python coprocessing 
code in the [containerized stack](/stack/docker/) and 2) defines the event-loop-based python script, [app.py](./app.py), 
that is run as the main command in the coprocessing cointainer.

### Container setup

The [Dockerfile](./Dockerfile) is built into an image by the [build](./build) script and produces and image based on the 
[[../base-py-tess]](../base-py-tess) image that has the latest python and tesseract and various data and vision processing
python libraries already installed.

The setup of the image here installs further ubuntu packages via apt-get and python libraries via pip. These can be listed
in packages.txt and requirements.txt and will be picked up by the build.

If rebuilding the container, you will need to update [docker-compose.yml](/stack/docker/docker-compose.yml) to use your locally
built image in the stack rather than an image from docker hub.

### Coprocessing App

The entrypoint for the app is [app.py](./app.py). To add a new processing function you will need to define a global function 
near the top of this script. The code at the end of the script connects to mongodb and runs a loop to periodically check for
job requests in the mongo "jobs" collection. When it finds one, it dispatches work on the job via a python function defined 
above, and places returned results into the "results" collection. It also catches and reports exceptions and other problems
via the results collection.

The processing function is executed with the current working directory set to /shared/jobs/[some-job-id].

The required form of a "jobs" document is:
```js
{
  "job_id": "<string>",  // needs to be a unique string - used to corellate results
  "command": "<string>", // references a function defined in app.py
  "args": {              // named arguments passed to the referenced python function
     "key1": "any keys and values here",
     "key2": [1, 2, 3]
  }
}
```
