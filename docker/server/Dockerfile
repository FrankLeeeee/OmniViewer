FROM python:3.7.4

ARG client_host=localhost
ARG client_port=5000
ARG server_port=8000

RUN apt-get update && apt-get install -y git-core redis-server\
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/server \ 
    && mkdirs log \
    && sed -i "s/8000/$server_port/g" gunicorn.conf \
    && pip install -r requirements.txt \
    && cd ./OmniViewer \
    && sed -i "s/localhost/$client_host/g" settings.py \
    && sed -i "s/5000/$client_port/g" settings.py 


WORKDIR /home/OmniViewer/server