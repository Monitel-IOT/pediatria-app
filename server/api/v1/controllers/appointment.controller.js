const {
  createNewAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  addNewDiagnosisToAppointment,
  addNewTreatmentToAppointment,
  addNewAuxiliaryExamToAppointment,
  addNewSymptomToAppointment,
} = require('../services/appointment.service');
const { createNewAuxiliaryExam, findAuxiliaryExam } = require('../services/auxiliaryExam.service');
const { createNewDiagnosis, findDiagnosis } = require('../services/diagnosis.service');
const { createNewTreatment, findTreatment } = require('../services/treatment.service');
const { createNewSymptom, findSymptom } = require('../services/symptom.service');
const { createNewLongTreatment } = require('../services/longTreatment.service');

const createNewAppointmentHandler = async (req, res, next) => {
  try {
    const appointment = req.body;
    const patientId = req.params.id;
    const { id } = req.user;

    const { diagnoses } = req.body;
    const { treatments } = req.body;
    const { auxiliaryExams } = req.body;
    const { symptoms } = req.body;
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

    // *********************  Diagnosticos *******************************************
    // *******************************************************************************

    const promiseArrayDiagnosesToAddorCreate = diagnoses.map(async (diagnosis) => {
      const findedDiagnosis = await findDiagnosis(diagnosis.name, id);

      let addOrCreateDiagnosis;
      if (findedDiagnosis !== null) {
        addOrCreateDiagnosis = await addNewDiagnosisToAppointment(
          newAppointment.id,
          findedDiagnosis.id,
        );
      } else {
        addOrCreateDiagnosis = await createNewDiagnosis(
          newAppointment.id,
          diagnosis.name,
          id,
        );
      }
      return addOrCreateDiagnosis;
    });

    await Promise.all(promiseArrayDiagnosesToAddorCreate);

    // *********************  Tratamientos *******************************************
    // *******************************************************************************

    const promiseArrayTreatmentsToAddOrCreate = treatments.map(async (treatment) => {
      const findedTreatment = await findTreatment(treatment.name, id);

      let addOrCreateTreatment;
      if (findedTreatment !== null) {
        addOrCreateTreatment = await addNewTreatmentToAppointment(
          newAppointment.id,
          findedTreatment.id,
        );
      } else {
        addOrCreateTreatment = await createNewTreatment(
          newAppointment.id,
          treatment.name,
          id,
        );
      }
      return addOrCreateTreatment;
    });

    await Promise.all(promiseArrayTreatmentsToAddOrCreate);

    // *********************  Examenes auxiliares ************************************
    // *******************************************************************************

    const promiseArrayAuxiliaryExamToAddOrCreate = auxiliaryExams.map(async (auxiliaryExam) => {
      const findedAuxiliaryExam = await findAuxiliaryExam(auxiliaryExam.name, id);

      let addOrCreateAuxiliaryExam;
      if (findedAuxiliaryExam !== null) {
        addOrCreateAuxiliaryExam = await addNewAuxiliaryExamToAppointment(
          newAppointment.id,
          findedAuxiliaryExam.id,
        );
      } else {
        addOrCreateAuxiliaryExam = await createNewAuxiliaryExam(
          newAppointment.id,
          auxiliaryExam.name,
          id,
        );
      }
      return addOrCreateAuxiliaryExam;
    });

    await Promise.all(promiseArrayAuxiliaryExamToAddOrCreate);

    // *********************  sintomas  **********************************************
    // *******************************************************************************

    const promiseArraySymptomsToAddOrCreate = symptoms.map(async (symptom) => {
      const findedSymptom = await findSymptom(symptom.name, id);

      let addOrCreateSymtom;
      if (findedSymptom !== null) {
        addOrCreateSymtom = await addNewSymptomToAppointment(
          newAppointment.id,
          findedSymptom.id,
        );
      } else {
        addOrCreateSymtom = await createNewSymptom(
          newAppointment.id,
          symptom.name,
          id,
        );
      }
      return addOrCreateSymtom;
    });

    await Promise.all(promiseArraySymptomsToAddOrCreate);

    // *********************  Tratamientos Largo  ******************************
    // *******************************************************************************

    // Creando los tratamientos largos
    const promiseArrayLongTreatments = longTreatments.map((longTreatment) => {
      const newLongTreatment = createNewLongTreatment(newAppointment.id, longTreatment);
      return newLongTreatment;
    });

    await Promise.all(promiseArrayLongTreatments);

    const finalAppointment = await getAppointmentById(newAppointment.id);

    res.status(200).json({
      data: finalAppointment,
      status: 'OK',
    });
  } catch (error) {
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
