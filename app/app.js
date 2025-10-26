const express = require('express');
const app = express();
const port = process.envPORT || 3000;

app.get('/api/v1/hello', (req, res) => {
  res.json ({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
