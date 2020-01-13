EXEC = docker exec -it puppeteer-vnc

get-cookie:
	$(EXEC) node getCookie.js

set-cookie:
	$(EXEC) node setCookie.js
