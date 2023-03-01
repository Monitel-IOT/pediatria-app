/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const symptomSchema = mongoose.Schema(
  {
    symptomName: { type: String, require: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

symptomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const symptom = mongoose.model('Symptom', symptomSchema);
module.exports = symptom;
