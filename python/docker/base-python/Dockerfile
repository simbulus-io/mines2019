FROM python:3.7-slim-stretch

COPY ./requirements.txt /requirements.txt
RUN echo hello
RUN pip install -r /requirements.txt

RUN pip install pipdeptree
RUN pipdeptree -fl
