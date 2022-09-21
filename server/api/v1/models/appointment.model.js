const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  AppointmentDate: { type: Date, require: true },
  Weight: { type: Number, require: false },
  Size: { type: Number, require: false },
  Age: { type: String, require: false },
  PerimetroEncefalico: { type: Number, require: false },
  IndiceMasaCop: { type: Number, require: false },
  DiagnosticoProl: [{
    Diagnostico: { type: String, require: false },
    Age: { type: String, require: false },
  }],
  CaracteristicasAtencion: {
    TiempoEnfer: { type: String, require: false },
    Relato: { type: String, require: false },
    Reevaluacion: { type: String, require: false },
  },
  FuncionesVitales: {
    FR: { type: Number, require: false },
    FC: { type: Number, require: false },
    T: { type: Number, require: false },
    Saturacion: { type: Number, require: false },
  },
  Diagnostico: [
    {
      NombreDiagnostico: { type: String, require: false },
    },
  ],
  TratamientoLargo: [
    {
      NombreTratamientoLargo: { type: String, require: false },
      Estado: { type: String, require: false },
      FechaSuspencion: { type: Date, require: false },
    },
  ],
  Tratamiento: [
    {
      NombreTratamiento: { type: String, require: false },
    },
  ],
  ExamenesAuxiliares: [
    {
      Examen: { type: String, require: false },
    },
  ],
  Percentiles: {
    PercentilPeso: { type: Number, require: false },
    PercentilTalla: { type: Number, require: false },
    PercentilMC: { type: Number, require: false },
  },
  Estado: { type: Number, require: false },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
