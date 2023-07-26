const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Add cache headers to disable caching for the webpage
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use('/', routes);

const port = 3000; // Change this port if needed
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
