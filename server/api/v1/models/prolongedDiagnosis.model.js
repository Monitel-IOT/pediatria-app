/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const prolongedDiagnosisSchema = mongoose.Schema(
  {
    nameProlongedDiagnosis: { type: String, require: false },
    age: { type: String, require: false },
  },
  { timestamps: true },
);

prolongedDiagnosisSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const prolongedDiagnosis = mongoose.model('ProlongedDiagnosis', prolongedDiagnosisSchema);
module.exports = prolongedDiagnosis;
