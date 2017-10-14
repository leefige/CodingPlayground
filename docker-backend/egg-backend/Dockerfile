FROM library/node:8.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .

RUN npm i --registry=https://registry.npm.taobao.org 

COPY . .

EXPOSE 7001

CMD npm start
