FROM ubuntu

RUN true && \
 apt-get -yqq update && \
 DEBIAN_FRONTEND=noninteractive apt-get -yqq install npm && \
true

WORKDIR /app
# COPY ./backend /app
# RUN npm install 

EXPOSE 3000

# CMD ["npm run dev"]

RUN touch /potato
CMD ["/bin/sh", "-c", "tail -F /potato"]


# npm install -g react-scripts 