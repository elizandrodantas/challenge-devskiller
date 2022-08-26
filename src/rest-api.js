// * You may uncomment one of these modules:
const express = require('express');
// const koa = require('koa');
// const hapi = require('@hapi/hapi');
// const restify = require('restify');

module.exports = (stepService) => {
  const REST_PORT = 8080,
    app = express();

  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server

  app.get('/', (req, res) => res.status(200).end());

  app.get('/users/:username/steps', (req, res) => {
    let { username } = req.params;

    let data = stepService.get(username)

    if(!data)
      return res.status(404).json({ error: "User doesn't exist" });

    return res.status(200).json(data);
  });

  const server = app.listen(process.env.PORT || REST_PORT, () => console.log(`REST api started`));

  return server
};
