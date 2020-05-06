FROM python:3.7.4

ARG client_host=localhost
ARG client_port=5000

RUN apt-get update && apt-get install git-core gunicorn \
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/server \ 
    && pip install -r requirements.txt \
    && cd ./OmniViewer \
    && sed -i "s/localhost/$client_host/g" setting.py \
    && sed -i "s/3000/$client_port/g" setting.py \
    && apt-get install -y redis-server

WORKDIR /home/OmniViewer/server
