FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1
WORKDIR /app/api
COPY requirements.txt ./
RUN apt-get update \
    && apt-get install -y default-libmysqlclient-dev gcc \
    && pip install -r requirements.txt \
    && pip install -U pip uwsgi
COPY . ./
CMD ["uwsgi", "--ini", "uwsgi.ini"]
