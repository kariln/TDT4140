FROM python:3.7

WORKDIR /srv/app

RUN mkdir -p /run/uwsgi; mkdir -p /var/log/uwsgi

COPY shopstop_backend .
COPY docker-entrypoint.sh docker-entrypoint.sh

RUN pip install -r requirements.txt

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]