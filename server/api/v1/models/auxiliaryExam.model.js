/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const auxiliaryExamSchema = mongoose.Schema(
  {
    nameAuxiliaryExam: { type: String, require: false },
  },
  { timestamps: true },
);

auxiliaryExamSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const auxiliaryExam = mongoose.model('AuxiliaryExam', auxiliaryExamSchema);
module.exports = auxiliaryExam;
