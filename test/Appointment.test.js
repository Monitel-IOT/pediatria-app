const mongoose = require('mongoose');
const supertest = require('supertest');
const { server, listen } = require('../index');
const Appointment = require('../server/api/v1/models/appointment.model');

const api = supertest(server);

beforeEach(async () => {
  await Appointment.deleteMany({});
});

const validUser = {
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

const postAppointment = (user = validUser) => {
  const agent = api.post('/api/v1/appointment');
  return agent.send(user);
};

describe('Post Appointment', () => {
  it('returns 200 ok when post is valid', async () => {
    const response = await postAppointment();
    expect(response.status).toBe(200);
  });
  it('saves the user to database', async () => {
    await postAppointment();
    const userList = await Appointment.find({});
    expect(userList.length).toBe(1);
  });

  afterAll(() => {
    mongoose.connection.close();
    listen.close();
  });
});
