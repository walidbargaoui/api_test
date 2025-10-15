const express = require('express');

const app = express();

app.use(
  express.text({
    type: ['text/plain', 'text/csv', 'application/octet-stream'],
    limit: '1mb',
  })
);

module.exports = app;
