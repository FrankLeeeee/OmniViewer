FROM node:13.8.0

ARG server_host=localhost
ARG server_port=8000
ARG client_port=5000

RUN apt-get update && apt-get install -y nginx \
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/client \
    && npm install \
    && npm run build \
    && cd ./src && sed -i "s/localhost/$server_host/g" api.js \
    && sed -i "s/8000/$server_port/g" api.js \
    && cd ../../docker/client \
    && sed -i "s/3000/$client_port/g" omniviewer.conf \
    && cp omniviewer.conf /etc/nginx/conf.d/