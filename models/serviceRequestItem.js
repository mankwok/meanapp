const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ServiceRequestItemSchema = new Schema({
  requestType: { type: String, required: true },
  itemName: { type: String, required: true }
});

ServiceRequestItemSchema.plugin(autoIncrement.plugin, 'Service Request Item');

module.exports = mongoose.model('Service Request', ServiceRequestItemSchema);
