const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

let touches = 0;

app.get('/touch', (req, res) => {
  touches++;
  const onePxImageReadStream = fs.createReadStream('./assets/1px.png');

  onePxImageReadStream.on('open', function() {
    res.set('Content-type', 'image/png');
    onePxImageReadStream.pipe(res);
  });

  onePxImageReadStream.on('error', function() {
    res.status(500).end('Something unexpected happened');
  });
});

app.get('/touches', (req, res) => {
  res.set('Content-type', 'application/json');
  res.status(200).send({
    "touches": touches
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});