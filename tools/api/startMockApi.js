/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dataPath = path.join(__dirname, 'db.json');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dataPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
