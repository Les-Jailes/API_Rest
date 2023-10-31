const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API REST');
});

app.listen(port, () => {
    console.log('API REST | Server started | Port 3000');
  });      