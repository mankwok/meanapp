const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  applicationDeadline: { type: Date, required: true },
  venue: { type: String },
  vacancies: { type: Number, required: true },
  detail: { type: String },
  minParticipants: {type: Number },
  createUser: { type:String, required: true },
  participants: { type: Array },
  bookmarkUsers: { type: Array },
  notInterestedUsers: { type: Array }
});

ActivitySchema.plugin(autoIncrement.plugin, 'Activity');

module.exports = mongoose.model('Activity', ActivitySchema);
