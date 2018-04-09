const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ServiceRequestSchema = new Schema({
  requestType: { type: String, required: true },
  itemName: { type: String },
  requestDesc: { type: String },
  quantity: { type: Number },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date },
  approvedBy: { type: String },
  approvedAt: { type: Date }
});

ServiceRequestSchema.plugin(autoIncrement.plugin, 'Service Request');

module.exports = mongoose.model('Service Request', ServiceRequestSchema);
