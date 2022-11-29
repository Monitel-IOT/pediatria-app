/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  appointmentDate: { type: Date, require: true },
  weight: { type: Number, require: false },
  size: { type: Number, require: false },
  age: { type: String, require: false },
  brainPerimeter: { type: Number, require: false },
  bodyMassIndex: { type: Number, require: false },
  characteristicsAttention: {
    sickTime: { type: String, require: false },
    story: { type: String, require: false },
    reevaluation: { type: String, require: false },
  },
  vitalFunctions: {
    fr: { type: Number, require: false },
    fc: { type: Number, require: false },
    t: { type: Number, require: false },
    saturacion: { type: Number, require: false },
  },
  percentiles: {
    percentileWeight: { type: Number, require: false },
    heightPercentile: { type: Number, require: false },
    percentilMC: { type: Number, require: false },
  },
  state: { type: Boolean, require: true },
  prolongedDiagnoses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProlongedDiagnosis',
    },
  ],
  diagnoses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diagnosis',
    },
  ],
  longTreatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LongTreatment',
    },
  ],
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
    },
  ],
  auxiliaryExams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuxiliaryExam',
    },
  ],
}, { timestamps: true });

appointmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
