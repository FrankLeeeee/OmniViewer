#!/bin/bash

redis-server --daemonize yes \
&& gunicorn gunicorn OmniViewer.wsgi:application --bind 0.0.0.0:8000 --workers 4 --daemon