var express = require('express')
  , fs = require('fs')
  , cors = require('cors')
  , app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/', function (req, res) {
  var jsonFile = JSON.parse(fs.readFileSync('./users.json'));
  res.json(jsonFile);
});

app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});
