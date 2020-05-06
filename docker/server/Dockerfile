FROM python:3.7.4

ARG server_port=8000

RUN apt-get install git-core \
    && cd /home \
    && git clone xxx \
    && cd ./OmniViewer/server \ 
    && pip install -r requirements.txt \
    && sed -i "s/8000/$server_port/g" gunicorn.conf.py

WORKDIR /home/OmniViewer/server