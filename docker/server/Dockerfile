FROM python:3.7.4

ARG server_port=8000

RUN apt-get update && apt-get install git-core \
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/server \ 
    && pip install -r requirements.txt \
    && sed -i "s/8000/$server_port/g" gunicorn.conf.py \
    && apt-get install -y redis-server

WORKDIR /home/OmniViewer/server