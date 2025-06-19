const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  platform: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  followers: {
    type: String,
    required: true
  },
  reach: {
    type: String,
    required: true
  },
  impressions: {
    type: String,
    required: true
  },
  clicks: {
    type: String,
    required: true
  },
  conversions: {
    type: String,
    required: true
  },
  campaign_type: {
    type: String,
    required: true
  },
  isCompetitor: {
    type: Boolean,
    default: false
  },
  company: {
    type: String,
    // required: true
  },
  spend: {
    type: String,
    required: true
  },
  revenue: {
    type: String,
    required: true
  }
});
const Data = mongoose.model('Data', dataSchema);
module.exports = Data;

