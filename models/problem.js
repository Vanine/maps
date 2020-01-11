const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  img: { 
    data: String,
    required: false }
});

module.exports = mongoose.model('Problem', ProblemSchema, 'problems');