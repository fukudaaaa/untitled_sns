const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  res.send('hellllllo');
});

app.listen(8080 || process.env.PORT, function() {
  console.log('server started');
});
