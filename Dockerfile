FROM node:latest
ADD . /server
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.move/fs.rename/ ./lib/utils/rename.js
WORKDIR /server
RUN npm install
ENTRYPOINT ["/server/bin/dssrv"]
CMD ["-h"]