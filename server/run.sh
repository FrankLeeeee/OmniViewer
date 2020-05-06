#!/bin/bash

redis-server --daemonize yes \
&& gunicorn OmniViewer.wsgi:application -c gunicorn_conf.py