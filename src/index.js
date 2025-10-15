const fs = require('fs');
const path = require('path');

const app = require('./app');

const port = process.env.PORT || 3000;
const dataDirectory = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDirectory, 'test.csv');

app.post('/api/upload', async (req, res) => {
  try {
    if (typeof req.body !== 'string' || req.body.length === 0) {
      return res.status(400).json({ error: 'Request body must include CSV content.' });
    }

    await fs.promises.mkdir(dataDirectory, { recursive: true });
    await fs.promises.writeFile(filePath, req.body, 'utf8');

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to store uploaded file', error);
    return res.status(500).json({ error: 'Failed to store uploaded file.' });
  }
});

const server = app.listen(port, () => {
  server.keepAliveTimeout = 0;
  console.log('Server is up on port ' + port);
});

module.exports = server;
