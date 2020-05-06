FROM python:3.7.4

ARG client_host=localhost
ARG client_port=5000

RUN apt-get update && apt-get install -y git-core redis-server\
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/server \ 
    && pip install -r requirements.txt \
    && cd ./OmniViewer \
    && sed -i "s/localhost/$client_host/g" settings.py \
    && sed -i "s/3000/$client_port/g" settings.py 

WORKDIR /home/OmniViewer/server