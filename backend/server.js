const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cors = require('cors');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, database) {
    if (err) throw err;
    console.log("Connected to Mongo");
    });

app.use('/', require('./routes/index'));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, '../frontend/build')));
/*React root*/
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
});
app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});


