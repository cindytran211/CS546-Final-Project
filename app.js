const express = require('express');
const app = express();
const configRoutes = require('./routes');
configRoutes(app);

//The most basic express routes app page. Just required express and routes.
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
