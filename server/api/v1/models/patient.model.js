const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
  {
    numberHC: { type: String, required: false },
    dni: { type: String, required: false },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    birthWeight: { type: Number, required: false },
    childBirth: { type: String, required: false },
    apgar: { type: String, required: false },
    supplementaryFeeding: { type: Boolean, required: false },
    lactation: { type: String, required: false },
    gestation: { type: String, required: false },
    vaccines: [
      {
        name: { type: String, required: false },
      },
    ],
    state: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
