FROM node:20-alpine3.17

WORKDIR /web

# add `/app/node_modules/.bin` to $PATH
ENV PATH /web/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install -y http-server

# add app
COPY . ./

RUN npm run build

# start app
CMD http-server dist -p ${webport} --proxy "http://${svcinternalip}:${svcport}"