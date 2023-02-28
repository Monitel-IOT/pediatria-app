/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema(
  {
    nameTreatment: { type: String, require: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

treatmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = treatment;
