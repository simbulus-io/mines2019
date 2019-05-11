ARG base=base-python
FROM $base
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pipdeptree -fl
WORKDIR /app
CMD \
    echo " - - - - jupyter notebook --help - - - -" && \
    jupyter notebook --help && \
    echo " - - - - - - - - - - - - - - - - - - - -" && \
    export CONTAINER_ID=$HOSTNAME && \
    export INTERNAL_IP=`cat /etc/hosts | grep ${HOSTNAME} | cut -f 1` && \
    printf " HOSTNAME    = ${HOSTNAME}\n INTERNAL_IP = ${INTERNAL_IP=}\n" && \
    apt-get update && \
    apt-get install -y expect && \
    mkdir ~/.jupyter && \
    ./password.expect && \
    jupyter trust /notebooks/*.ipynb && \
    jupyter notebook -y --ip=$INTERNAL_IP --port=8900 --no-browser --allow-root --notebook-dir=/notebooks
