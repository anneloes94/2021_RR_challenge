FROM ubuntu

RUN true && \
 apt-get -yqq update && \
 DEBIAN_FRONTEND=noninteractive apt-get -yqq install npm && \
#  npm install 
true

WORKDIR /app
# COPY ./backend /app

EXPOSE 3000

# CMD ["npm start"]

RUN touch /potato
CMD ["/bin/sh", "-c", "tail -F /potato"]
