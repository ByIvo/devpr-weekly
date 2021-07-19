const express = require('express');
const fs = require('fs');

const mongoose = require('mongoose');
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const mongoUrl = process.env.MONGODB_URL;
const mongoDatabase = process.env.MONGODB_DATABASE;
const uri = `mongodb+srv://${username}:${password}@${mongoUrl}/${mongoDatabase}?retryWrites=true&w=majority`;
const conn = mongoose.createConnection(uri);

const MyModel = conn.model('View', { headers: Object });

const app = express();
const port = process.env.PORT || 3000;

app.get('/touch', (req, res) => {
  
  const m = new MyModel();
  m.headers = req.headers;
  m.save();

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