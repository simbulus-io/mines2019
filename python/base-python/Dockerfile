FROM python:3.7-slim-stretch as python-stage-0

COPY ./packages.txt /packages.txt

RUN apt-get update -y
RUN apt-get install -y `cat /packages.txt`

FROM python-stage-0

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

RUN pip install pipdeptree
RUN pipdeptree -fl
