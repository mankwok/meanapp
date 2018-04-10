const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ActivitySchema = new Schema({
  itemName: { type: String, required: true },
  vacancies: { type: Number, required: true },
  startDate: { type: Date },
  endDate: { type: Date }
});

ActivitySchema.plugin(autoIncrement.plugin, 'Activity');

module.exports = mongoose.model('Activity', ActivitySchema);
