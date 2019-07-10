#FROM base-python
FROM bmilne/python:1.0
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pipdeptree -fl
RUN python -m spacy download en_core_web_sm
WORKDIR /app
CMD ["python", "./app.py"]
