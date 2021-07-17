const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.get('/touch', (req, res) => {
  const onePxImageReadStream = fs.createReadStream('./assets/1px.png');

  onePxImageReadStream.on('open', function() {
    res.set('Content-type', 'image/png');
    onePxImageReadStream.pipe(res);
  });

  onePxImageReadStream.on('error', function() {
    res.status(500).end('Something unexpected happened');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});