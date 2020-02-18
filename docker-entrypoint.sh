#!/bin/bash

python manage.py collectstatic --noinput

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start server
echo "Starting server"
uwsgi --ini shopstop_backend_uwsgi.ini