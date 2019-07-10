ARG base=base-py-tess
FROM $base as stage0
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update
RUN apt-get install -y expect
RUN apt-get install -y pandoc
RUN apt-get install -y texlive-xetex
RUN apt-get install -y gpg

FROM stage0 as stage1
# FROM $base as stage1
# COPY --from=stage0 /usr/bin/expect /usr/bin/expect
# COPY --from=stage0 /usr/lib/x86_64-linux-gnu/libexpect.* /usr/lib/x86_64-linux-gnu/
# COPY --from=stage0 /usr/lib/x86_64-linux-gnu/libtcl* /usr/lib/x86_64-linux-gnu/
# COPY --from=stage0 /usr/share/tcltk /usr/share/tcltk
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pipdeptree -fl

FROM stage1
VOLUME        ["../config/ipython/profile_default", "/root/.ipython/profile_default"]
WORKDIR /root/app
CMD \
    expect -v && \
    echo " - - - - jupyter notebook --help - - - -" && \
    jupyter notebook --help && \
    echo " - - - - - - - - - - - - - - - - - - - -" && \
    export CONTAINER_ID=$HOSTNAME && \
    export INTERNAL_IP=`cat /etc/hosts | grep ${HOSTNAME} | cut -f 1` && \
    printf " HOSTNAME    = ${HOSTNAME}\n INTERNAL_IP = ${INTERNAL_IP=}\n" && \
    mkdir ~/.jupyter && \
    ./password.expect && \
    jupyter trust /root/notebooks/*.ipynb && \
    jupyter notebook -y --ip=$INTERNAL_IP --port=80 --no-browser --allow-root --notebook-dir=/root/notebooks
