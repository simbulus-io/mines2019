FROM base-py-tess as coproc-stage-0

COPY ./packages.txt /packages.txt

RUN set -xe ; \
      apt-get install -yy `cat /packages.txt` ;

CMD tail -f /dev/null

FROM coproc-stage-0

WORKDIR /app


RUN set -xe ; \
      cat /etc/ImageMagick-6/policy.xml \
      | sed -e 's/rights="none"/rights="read"/' \
      > /etc/ImageMagick-6/policy.xml

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt
RUN pipdeptree -fl

CMD "./bootstrap"
