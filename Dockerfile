FROM node:12.14.1-alpine3.11

RUN apk update

# japanese font
RUN apk add --no-cache curl fontconfig font-noto-cjk \
  && fc-cache -fv

# Installs latest Chromium (76) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont 

# timezone
RUN apk add --update --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium

COPY ./package.json /home/alpine/package.json
COPY ./package-lock.json /home/alpine/package-lock.json
WORKDIR /home/alpine
RUN npm install

COPY . .

ENV DISPLAY :1

ARG VNC_PASSWORD=secret
ENV VNC_PASSWORD ${VNC_PASSWORD}
ENV GOPATH /home/alpine/go

RUN echo "http://dl-3.alpinelinux.org/alpine/edge/testing" >>/etc/apk/repositories \
 && apk --no-cache add \
    x11vnc xvfb supervisor sudo \
    dwm dmenu ii st \
    ttf-ubuntu-font-family \
 && addgroup alpine \
 && adduser -G alpine -s /bin/ash -D alpine \
 && echo "alpine:alpine" | /usr/sbin/chpasswd \
 && echo "alpine    ALL=(ALL) ALL" >> /etc/sudoers \
 && rm -rf /apk /tmp/* /var/cache/apk/* \
 && mkdir -p /etc/supervisor/conf.d \
 && x11vnc -storepasswd $VNC_PASSWORD /etc/vncsecret \
 && chmod 444 /etc/vncsecret

COPY supervisord.conf /etc/supervisor/conf.d
CMD ["/usr/bin/supervisord","-c","/etc/supervisor/conf.d/supervisord.conf"]

EXPOSE 5900
