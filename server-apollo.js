const express = require('express');
const SERVER = require('./schema/schema-apollo');
const APP = express();
const PORT = 3000;

SERVER.applyMiddleware({
  app: APP
});

APP.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

