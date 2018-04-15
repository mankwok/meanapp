const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const serviceRequestSchema = new Schema({
  requestType: { type: String, required: true },
  requestItem: { type: Number, ref: 'Service Request Item', required: true },
  requestDesc: { type: String, required: true },
  quantity: { type: Number },
  status: { type: String, default: 'NEW' },
  createdBy: {type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  approvedBy: {type: Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
});

serviceRequestSchema.plugin(autoIncrement.plugin, 'Service Request');

module.exports = mongoose.model('Service Request', serviceRequestSchema);
