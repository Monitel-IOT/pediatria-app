const mongoose = require('mongoose');
const supertest = require('supertest');
const { server, listen } = require('../index');
const Appointment = require('../server/api/v1/models/appointment.model');

const api = supertest(server);
const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MDljZmYxMTZlNWJhNzQwNzQ1YmZlZGE1OGUxNmU4MmYzZmQ4MDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGVkaWF0cmlhLWFwcCIsImF1ZCI6InBlZGlhdHJpYS1hcHAiLCJhdXRoX3RpbWUiOjE2Njg1NjM3MTMsInVzZXJfaWQiOiJsQ3pGS2lKUmhHZVNNNDhCQ2dPODEwOGlQY3UyIiwic3ViIjoibEN6RktpSlJoR2VTTTQ4QkNnTzgxMDhpUGN1MiIsImlhdCI6MTY2ODU2MzcyNCwiZXhwIjoxNjY4NTY3MzI0LCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.i5yTnU_li7WzRnqEoAIDvZxRPSLRPHqOU29IAEZKE8V_3aJ5KE_c_aW1Sa7iB3ex3mJHlw-NZUshGeWhtENDtE5tJiOc1mplpWukO5Rm2n0azFxn-xKRudSRFMzdRIEtJWpSDGtF90PDAZyieMn7wbNuFOaggUcZ7s0jWgiI8A-J7g6Gyukee_zCd_zl0tcpRsb1LGBzyGXvsug6-XAG8N_Qlpc8QS-pyQHhp6cvz4-9iZ1jf_GR72pB0upZ7RTudW8V8yFGLNX0b_-aBybv0M9ucMl19R-fQ8-X-W4HwgM5D6yWXSdbdC14lwA0kAP6D0rrI0_T8XWH5lOP1AQHGA';
const validPatientId = '634df7b9128e2ed1e2143f07';

const validAppointment = {
  FechaAtencion: '2022/08/18',
  Peso: 5.78,
  Talla: 78,
  Edad: '2 años',
  PerimetroEncefalico: 15,
  IndiceMasaCop: 5,
  DiagnosticoProl: [
    {
      Diagnostico: 'Diabetes',
      Edad: '3 meses',
    },
    {
      Diagnostico: 'No se',
      Edad: '2 meses',
    },
  ],
  CaracteristicasAtencion: {
    TiempoEnfer: '3 dias',
    Relato: 'Se encontraba con malestar general',
    Reevaluacion: 'Se reevaluara en 3 dias',
  },
  FuncionesVitales: {
    FR: 37,
    FC: 15,
    T: 36,
    Saturacion: 95,
  },
  Diagnostico: [
    { NombreDiagnostico: 'Gripe' },
    { NombreDiagnostico: 'Infeccion estomacal' },
  ],
  TratamientoLargo: [
    {
      NombreTratamientoLargo: 'Eutirox',
      Estado: 'Activo',
      FechaSuspencion: null,
    },
    {
      NombreTratamientoLargo: 'Ranttt',
      Estado: 'Activo',
      FechaSuspencion: null,
    },
  ],
  Tratamiento: [
    { NombreTratamiento: 'Ibuprofeno' },
    { NombreTratamiento: 'Paracetamol' },
  ],
  ExamenesAuxiliares: [
    { Examen: 'Orina' },
    { Examen: 'Sangre' },
  ],
  Percentiles: {
    PercentilPeso: 37,
    PercentilTalla: 15,
    PercentilMC: 36,
  },
  Estado: 1,
};

const postAppointment = (user = validAppointment, patientId = validPatientId) => {
  const agent = api.post(`/api/v1/appointment/${patientId}`).set('Authorization', `Bearer ${authToken}`);
  return agent.send(user);
};

const deleteAppointment = (appointmentId) => {
  const agent = api.delete(`/api/v1/appointment/${appointmentId}`).set('Authorization', `Bearer ${authToken}`);
  return agent.send();
};

beforeEach(async () => {
  await Appointment.deleteMany({});
});
describe('Post Appointment', () => {
  it('returns 200 ok when post is valid', async () => {
    const response = await postAppointment();
    expect(response.status).toBe(200);
  });
  it('saves the appointment to database', async () => {
    await postAppointment();
    const appointmentList = await Appointment.find({});
    expect(appointmentList.length).toBe(1);
  });
});

describe('Delete Appointment', () => {
  it('returns 200 ok when the appointment was deleted', async () => {
    const newAppointment = await Appointment.create(validAppointment);
    const response = await deleteAppointment(newAppointment.id);
    expect(response.status).toBe(200);
  });

  it('deletes the appointment from database', async () => {
    const newAppointment = await Appointment.create(validAppointment);
    await deleteAppointment(newAppointment.id);
    const appointment = await Appointment.findOne({ _id: newAppointment.id });
    expect(appointment.state).toBe(false);
  });
});

afterAll(() => {
  mongoose.connection.close();
  listen.close();
});
