FROM base-py-tess as node-py-stage-0

COPY ./packages.txt /packages.txt

RUN set -xe ; \
      apt-get update -yy ; \
      apt-get install -yy nodejs npm ;

CMD tail -f /dev/null

FROM node-py-stage-0 as node-py-stage-1

RUN set -xe ; \
      apt-get install -yy `cat /packages.txt` ;

WORKDIR /root

COPY ./package.json /root/package.json

RUN set -xe ; \
      npm install -g yarn ; \
      yarn install ; \
      yarn global add typescript ;

CMD tail -f /dev/null

FROM node-py-stage-1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pipdeptree -fl

CMD tail -f /dev/null
