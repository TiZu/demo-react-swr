/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dataPath = path.join(__dirname, 'db.json');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dataPath);
const middlewares = jsonServer.defaults();

/* Add random delay on POST requests */
function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

server.use((req, res, next) => {
  if (req.method.toUpperCase() === 'POST') {
    setTimeout(next, getRandomInt(3000));
  } else {
    next();
  }
});

server.use(middlewares);

/* randomly throw Errors on POST requests */
server.post('/*', (req, res, next) => {
  const shouldThrowError = getRandomInt(1) > 0;
  if (shouldThrowError) {
    res.status(500).json('This error has been generated for development purposes!');
  } else {
    next();
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
