npm run compile
docker build -t xvnc .
docker run --name puppeteer-vnc -it --rm -p 5900:5900 xvnc
