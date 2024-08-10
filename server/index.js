const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

// Aylien API setup
const aylien = require('aylien_textapi');
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.post('/analyze', function (req, res) {
  const { text } = req.body;
  textapi.sentiment({ text }, (error, response) => {
    if (error === null) {
      res.send(response);
    } else {
      res.status(500).send(error);
    }
  });
});

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});
