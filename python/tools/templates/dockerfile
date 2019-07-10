ARG base=base-python
FROM $base
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pipdeptree -fl
WORKDIR /app
CMD ["python", "./app.py"]
