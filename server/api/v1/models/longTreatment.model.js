/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const longTreatmentSchema = mongoose.Schema(
  {
    longTreatmentName: { type: String, require: false },
    state: { type: Boolean, require: false },
    suspensionDate: { type: Date, require: false },
  },
  { timestamps: true },
);

longTreatmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const longTreatment = mongoose.model('LongTreatment', longTreatmentSchema);
module.exports = longTreatment;
