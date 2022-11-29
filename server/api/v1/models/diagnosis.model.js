/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema(
  {
    diagnosticName: { type: String, require: false },
  },
  { timestamps: true },
);

diagnosisSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const diagnosis = mongoose.model('Diagnosis', diagnosisSchema);
module.exports = diagnosis;
