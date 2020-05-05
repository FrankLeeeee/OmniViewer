ARG APIHOST="localhost"
ARG APIPORT="8000"
ARG CLIENTPORT="5000"

FROM node:13.8.0

RUN apt-get update && apt-get install -y nginx \
    && cd /home \
    && git clone https://github.com/FrankLeeeee/OmniViewer.git \
    && cd ./OmniViewer/client \
    && npm install \
    && npm run build \
    && cd ./src && sed -i "s/localhost/${APIHOST}/g" api.js \
    && sed -i "s/8000/${APIPORT}/g" api.js \
    && cd ../../docker/client \
    && sed -i "s/3000/${CLIENTPORT}/g" omniviewer.conf \
    && cp omniviewer.conf /etc/nginx/conf.d/
    

