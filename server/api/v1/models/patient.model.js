const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
  {
    NumberHC:{ type: Number, required: true },
    DNI:{ type: String, required: false },
    Name:{ type: String, required: true },
    LastName:{ type: String, required: true },
    DateBirth:{ type: Date, required: true },
    Gender:{ type: String, required: true },
    BirthWeight:{ type: Number, required: false },
    Childbirth:{ type: String, required: false },
    Apgar:{ type: String, required: false },
    SupplementaryFeeding:{ type: String, required: false },
    Lactation:{ type: String, required: false },
    Gestation:{ type: String, required: false },
    Vaccines:{ type: String, required: false },
    Estate:{ type: Boolean, required: true }
  },
  { timestamps: true },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
