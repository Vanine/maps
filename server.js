const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3001;
const routes = require('./routes/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, database) {
    if (err) throw err;
    console.log("Connected to Mongo");
    });
app.use('/', routes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  })
}
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


