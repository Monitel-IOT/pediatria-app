const {
  createNewAppointment, getAppointmentById, updateAppointment, deleteAppointment,
} = require('../services/appointment.service');
const { createNewAuxiliaryExam } = require('../services/auxiliaryExam.service');
const { createNewDiagnosis } = require('../services/diagnosis.service');
const { createNewProlongedDiagnosis } = require('../services/prolongedDiagnosis.service');
const { createNewTreatment } = require('../services/treatment.service');
const { createNewLongTreatment } = require('../services/longTreatment.service');

const createNewAppointmentHandler = async (req, res, next) => {
  try {
    const appointment = req.body;
    const patientId = req.params.id;
    const { id } = req.user;

    const { treatments } = req.body;
    const { auxiliaryExams } = req.body;
    const { diagnoses } = req.body;
    const { prolongedDiagnoses } = req.body;
    const { longTreatments } = req.body;

    const newAppointmentbody = {
      appointmentDate: appointment.appointmentDate,
      weight: appointment.weight,
      size: appointment.size,
      age: appointment.age,
      brainPerimeter: appointment.brainPerimeter,
      bodyMassIndex: appointment.bodyMassIndex,
      sickTime: appointment.sickTime,
      story: appointment.story,
      reevaluation: appointment.reevaluation,
      fRespiratory: appointment.fRespiratory,
      fCardiac: appointment.fCardiac,
      temperature: appointment.temperature,
      saturacion: appointment.saturacion,
      percentileWeight: appointment.percentileWeight,
      heightPercentile: appointment.heightPercentile,
      percentilMC: appointment.percentilMC,
      state: appointment.state,
    };
    const newAppointment = await createNewAppointment(patientId, newAppointmentbody);

    // Creando los Diagnosticos
    const promiseArrayDiagnoses = diagnoses.map((diagnosis) => {
      const newDiagnosis = createNewDiagnosis(newAppointment.id, diagnosis, id);
      return newDiagnosis;
    });

    await Promise.all(promiseArrayDiagnoses);

    // Creando los tratamientos
    const promiseArrayTreatments = treatments.map((treatment) => {
      const newTreatment = createNewTreatment(newAppointment.id, treatment, id);
      return newTreatment;
    });

    await Promise.all(promiseArrayTreatments);

    // Creando los Examenes auxiliares
    const promiseArrayAuxiliaryExams = auxiliaryExams.map((auxiliaryExam) => {
      const newAuxiliaryExam = createNewAuxiliaryExam(newAppointment.id, auxiliaryExam, id);
      return newAuxiliaryExam;
    });

    await Promise.all(promiseArrayAuxiliaryExams);

    // Creando los Diagnosticos Prolongados
    const promiseArrayProlongedDiagnoses = prolongedDiagnoses.map((prolongedDiagnosis) => {
      const newProlongedDiag = createNewProlongedDiagnosis(newAppointment.id, prolongedDiagnosis);
      return newProlongedDiag;
    });

    await Promise.all(promiseArrayProlongedDiagnoses);

    // Creando los tratamientos largos
    const promiseArrayLongTreatments = longTreatments.map((longTreatment) => {
      const newLongTreatment = createNewLongTreatment(newAppointment.id, longTreatment);
      return newLongTreatment;
    });

    await Promise.all(promiseArrayLongTreatments);

    const finalAppointment = getAppointmentById(newAppointment);

    res.status(200).json({
      data: finalAppointment,
      status: 'OK',
    });
  } catch (error) {
    console.log('error ', { error });
    next(error);
  }
};

const getAppointmentByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);
    res.status(200).json({
      data: appointment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = req.body;
    const newAppointment = await updateAppointment(id, appointment);
    res.status(200).json({
      data: newAppointment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointmentHandler = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    await deleteAppointment(appointmentId);
    res.status(200).json({ msg: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewAppointmentHandler,
  getAppointmentByIdHandler,
  updateAppointmentHandler,
  deleteAppointmentHandler,
};
