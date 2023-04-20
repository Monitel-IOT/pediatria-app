/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema(
  {
    name: { type: String, require: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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
