const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Point', PointSchema, 'points');