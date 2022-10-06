const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  appointmentDate: { type: Date, require: true },
  weight: { type: Number, require: false },
  size: { type: Number, require: false },
  age: { type: String, require: false },
  brainPerimeter: { type: Number, require: false },
  bodyMassIndex: { type: Number, require: false },
  prolongedDiagnosis: [{
    diagnosis: { type: String, require: false },
    age: { type: String, require: false },
  }],
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
  diagnosis: [
    {
      diagnosticName: { type: String, require: false },
    },
  ],
  longTreatment: [
    {
      longTreatmentName: { type: String, require: false },
      status: { type: Boolean, require: false },
      suspensionDate: { type: Date, require: false },
    },
  ],
  treatment: [
    {
      nameTreatment: { type: String, require: false },
    },
  ],
  auxiliaryExams: [
    {
      exams: { type: String, require: false },
    },
  ],
  percentiles: {
    percentileWeight: { type: Number, require: false },
    heightPercentile: { type: Number, require: false },
    percentilMC: { type: Number, require: false },
  },
  status: { type: Boolean, require: true },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
