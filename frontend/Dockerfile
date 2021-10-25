FROM ubuntu

RUN true && \
 apt-get -yqq update && \
 DEBIAN_FRONTEND=noninteractive apt-get -yqq install npm && \
true

WORKDIR /app
COPY package.json /app/package.json
RUN npm install && npm install -g react-scripts
COPY ./src /app/src
COPY ./public /app/public

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm start"]
