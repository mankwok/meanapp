const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const serviceRequestItemSchema = new Schema({
  requestType: { type: String, required: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedBy: { type: String },
  modifiedAt: { type: Date }
});

serviceRequestItemSchema.pre('save', function(next) {
  this.name = this.name[0].toUpperCase() + this.name.slice(1);
  next();
});

serviceRequestItemSchema.plugin(autoIncrement.plugin, 'Service Request Item');

module.exports = mongoose.model('Service Request Item', serviceRequestItemSchema);
