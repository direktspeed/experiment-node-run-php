FROM node:latest
ADD . /server
RUN cd $(node -p "r=require;r('path').dirname(r.resolve('npm/package.json'))") \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.move/fs.rename/ ./lib/utils/rename.js
ENTRYPOINT ["node", "/server/bin/dssrv"]
CMD help