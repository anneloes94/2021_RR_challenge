FROM ubuntu

RUN true && \
 apt-get -yqq update && \
 DEBIAN_FRONTEND=noninteractive apt-get -yqq install npm && \
true

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY ./index.js /app/
COPY ./sql-connector.js /app/

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm start"]
