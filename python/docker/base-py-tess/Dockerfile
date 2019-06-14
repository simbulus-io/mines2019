FROM jitesoft/tesseract-ocr:18.04 as py-tess-stage-0

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# ADD https://github.com/tesseract-ocr/tessdata/blob/master/equ.traineddata?raw=true /usr/share/tesseract-ocr/4.00/tessdata/equ.traineddata

COPY ./packages.txt /packages.txt

ENV DEBIAN_FRONTEND=noninteractive

RUN set -xe ; \
      apt-get update ; \
      apt-get install -y software-properties-common ; \
      add-apt-repository ppa:ubuntu-toolchain-r/ppa ; \
      apt-get install -y `cat /packages.txt` ;

RUN set -xe ; \
      apt-get install -y python3.7 ; \
      apt-get install -y python3-pip ; \
      rm /usr/bin/python3 ; \
      ln -s /usr/bin/python3.7 /usr/bin/python3 ; \
      ln -s /usr/bin/python3.7 /usr/bin/python ; \
      ln -s /usr/bin/pip3 /usr/bin/pip ;

CMD tail -f /dev/null

FROM py-tess-stage-0

ENV DEBIAN_FRONTEND=noninteractive

COPY ./requirements.txt /requirements.txt

RUN set -xe ; \
      pip install -r /requirements.txt ; \
      pip install pipdeptree ; \
      pipdeptree -fl ;
