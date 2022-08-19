const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  AtencionId: String,
  FechaAtencion: String,
  Peso: String,
  Talla: String,
  Edad: String,
  PerimetroEncefalico: String,
  IndiceMasaCop: String,
  DiagnosticoProl: [{
    Diagnostico: String,
    Edad: String,
  }],
  CaracteristicasAtencion: {
    TiempoEnfer: String,
    Relato: String,
    Reevaluacion: String,
  },
  FuncionesVitales: {
    FR: String,
    FC: String,
    T: String,
    Saturacion: String,
  },
  Diagnostico: [
    {
      NombreDiagnostico: String,
    },
  ],
  TratamientoLargo: [
    {
      NombreTratamientoLargo: String,
      Estado: String,
      FechaSuspencion: String,
    },
  ],
  Tratamiento: [
    {
      NombreTratamiento: String,
    },
  ],
  ExamenesAuxiliares: [
    {
      Examen: String,
    },
  ],
  Percentiles: {
    PercentilPeso: String,
    PercentilTalla: String,
    PercentilMC: String,
  },
  Estado: String,
  FechaCreacion: String,
  FechaModificacion: String,
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
