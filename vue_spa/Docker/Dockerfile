FROM node:lts-alpine

WORKDIR /home/usr/app
COPY ["./package.json", "./package-lock.json*",  "./"]
RUN npm install --verbose && mv node_modules ../
RUN chown -R node /home/usr/app
USER node
