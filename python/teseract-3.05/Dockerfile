# Tesseract
#
# VERSION 3.05.02

# Derived from a Dockerfile by James Brink
# https://hub.docker.com/u/jamesbrink
# http://jamesbrink.github.io/

# - - - - - - - - - - - - - - - - - - - -
FROM alpine:3.7 AS tess_dependencies_0

ENV DEBIAN_FRONTEND=noninteractive

# Install all needed runtime dependencies.
# -x shell echos each command after it expands the command and before it executes it
# −e when any command exits status>0 the shell exits

RUN set -xe; \
      apk add --update --no-cache --virtual .runtime-deps \
          bash \
          cairo \
          giflib \
          icu \
          libjpeg-turbo \
          libpng \
          libwebp-dev \
          openjpeg \
          pango \
          tiff \
          zlib;

RUN set -xe; \
      apk add --no-cache --virtual .build-deps \
          alpine-sdk \
          autoconf \
          automake \
          cairo-dev \
          giflib-dev \
          git \
          icu-dev \
          libjpeg-turbo-dev \
          libpng-dev \
          libtool \
          libwebp-dev \
          openjpeg-dev \
          pango-dev \
          tiff-dev \
          zlib-dev;

RUN set -xe; \
   cd /var/tmp; \
      wget http://www.leptonica.org/source/leptonica-1.75.3.tar.gz; \
      tar xfv leptonica-1.75.3.tar.gz; \
      rm leptonica-1.75.3.tar.gz; \
      cd leptonica-1.75.3; \
      ./configure --prefix=/usr/local/; \
      make; \
      make install; \
      cd /var/tmp; \
      rm -rf leptonica-1.75.3;

# - - - - - - - - - - - - - - - - - - - -
FROM tess_dependencies_0 AS tesseract-src

ENV DEBIAN_FRONTEND=noninteractive

COPY ./patch.txt /root/patch.txt

RUN set -xe; \
    cd /root; \
    git clone https://github.com/tesseract-ocr/tesseract.git; \
      cd tesseract; \
      git checkout 3.05.02; \
      cat ../patch.txt | patch -p1 ; \
      ./autogen.sh; \
      ./configure --prefix=/usr/local/; \
      make; \
      make install;

RUN set -xe; \
      cd /usr/local/share/tessdata; \
      wget https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata; \
      wget https://github.com/tesseract-ocr/tessdata/raw/3.04.00/equ.traineddata; \
      wget https://github.com/tesseract-ocr/tessdata/raw/3.04.00/osd.traineddata;

# RUN apk del .build-deps;

# tesseract user
RUN addgroup -g 1100 -S tesseract && adduser -u 1100 -S -h /tesseract -s /bin/sh -G tesseract tesseract
RUN set -xe; \
      cd /; \
      chown -R tesseract:tesseract /tesseract;

# - - - - - - - - - - - - - - - - - - - -
FROM tesseract-src

ENV TINI_VERSION v0.18.0

LABEL decription="Tesseract OCR" \
  version="3.05.02" \
  org.label-schema.name="Tesseract OCR"

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN set -xe; \
      apk add openssh-client

RUN set -xe; \
      cd /root ; \
      wget https://user-images.githubusercontent.com/10274958/52034153-934f9600-2562-11e9-9f5f-b683cbbd0c89.jpg; \
      mv 52034153-934f9600-2562-11e9-9f5f-b683cbbd0c89.jpg fullview.jpg

# unprivileged user account
# USER tesseract

WORKDIR /tesseract

CMD su - tesseract && echo "container running (tail -f /dev/null) && tail -f /dev/null

# - - - - - - - - - - - - - - - - - - - -
