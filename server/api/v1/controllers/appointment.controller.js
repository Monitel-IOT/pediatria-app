const {
  createNewAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  addNewDiagnosisToAppointment,
  addNewTreatmentToAppointment,
  addNewSymptomToAppointment,
  addNewAuxiliaryExamToAppointment,
} = require('../services/appointment.service');
const { createNewAuxiliaryExam } = require('../services/auxiliaryExam.service');
const { createNewDiagnosis } = require('../services/diagnosis.service');
const { createNewTreatment } = require('../services/treatment.service');
const { createNewLongTreatment } = require('../services/longTreatment.service');
const { createNewSymptom } = require('../services/symptom.service');

const createNewAppointmentHandler = async (req, res, next) => {
  try {
    const appointment = req.body;
    const patientId = req.params.id;
    const { id } = req.user;

    const { treatments } = req.body;
    const { auxiliaryExams } = req.body;
    const { diagnoses } = req.body;
    const { longTreatments } = req.body;
    const { symptoms } = req.body;

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
    const diagnosesToAdd = diagnoses.filter((obj) => obj.id !== '');
    const diagnosesToCreate = diagnoses.filter((obj) => obj.id === '');

    // Agregando los Diagnosticos a la atencion
    const promiseArrayDiagnosesToAdd = diagnosesToAdd.map((diagnosis) => {
      const addDiagnosis = addNewDiagnosisToAppointment(newAppointment.id, diagnosis.id);
      return addDiagnosis;
    });

    await Promise.all(promiseArrayDiagnosesToAdd);

    // Creando los Diagnosticos y agrega a la atencion
    const promiseArrayDiagnosesToCreate = diagnosesToCreate.map((diagnosis) => {
      const newDiagnosis = createNewDiagnosis(newAppointment.id, diagnosis.diagnosisName, id);
      return newDiagnosis;
    });

    await Promise.all(promiseArrayDiagnosesToCreate);

    // *********************  Tratamientos *******************************************
    // *******************************************************************************
    const TreatmentsToAdd = treatments.filter((obj) => obj.id !== '');
    const TreatmentsToCreate = treatments.filter((obj) => obj.id === '');

    // Agregando los tratamientos a la atencion
    const promiseArrayTreatmentsToAdd = TreatmentsToAdd.map((treatment) => {
      const addTreatments = addNewTreatmentToAppointment(newAppointment.id, treatment.id);
      return addTreatments;
    });

    await Promise.all(promiseArrayTreatmentsToAdd);

    // Creando los tratamientos
    const promiseArrayTreatmentsTocreate = TreatmentsToCreate.map((treatment) => {
      const newTreatment = createNewTreatment(newAppointment.id, treatment.nameTreatment, id);
      return newTreatment;
    });

    await Promise.all(promiseArrayTreatmentsTocreate);

    // *********************  Examenes auxiliares ************************************
    // *******************************************************************************
    const auxiliaryExamsToAdd = auxiliaryExams.filter((obj) => obj.id !== '');
    const auxiliaryExamsToCreate = auxiliaryExams.filter((obj) => obj.id === '');

    // Agregando examenes auxiliares a la atencion
    const promiseArrayAuxiliaryExamsToAdd = auxiliaryExamsToAdd.map((auxiliaryExam) => {
      const addAuxiliaryExams = addNewAuxiliaryExamToAppointment(
        newAppointment.id,
        auxiliaryExam.id,
      );
      return addAuxiliaryExams;
    });

    await Promise.all(promiseArrayAuxiliaryExamsToAdd);

    // Creando los Examenes auxiliares
    const promiseArrayAuxiliaryExamsTocreate = auxiliaryExamsToCreate.map((auxiliaryExam) => {
      const newAuxiliaryExam = createNewAuxiliaryExam(
        newAppointment.id,
        auxiliaryExam.nameAuxiliaryExam,
        id,
      );
      return newAuxiliaryExam;
    });

    await Promise.all(promiseArrayAuxiliaryExamsTocreate);

    // *********************  sintomas  **********************************************
    // *******************************************************************************
    const symptomsToAdd = symptoms.filter((obj) => obj.id !== '');
    const symptomsToCreate = symptoms.filter((obj) => obj.id === '');

    // Agregando sintomas a la atencion
    const promiseSymptomsToAdd = symptomsToAdd.map((symptom) => {
      const addSymptoms = addNewSymptomToAppointment(newAppointment.id, symptom.id);
      return addSymptoms;
    });

    await Promise.all(promiseSymptomsToAdd);

    // Creando los sintomas
    const promiseArraySymptomsToCreate = symptomsToCreate.map((symptom) => {
      const newSymptom = createNewSymptom(newAppointment.id, symptom.symptomName, id);
      return newSymptom;
    });

    await Promise.all(promiseArraySymptomsToCreate);

    // *********************  Tratamientos Largo  ******************************
    // *******************************************************************************

    // Creando los tratamientos largos
    const promiseArrayLongTreatments = longTreatments.map((longTreatment) => {
      const newLongTreatment = createNewLongTreatment(newAppointment.id, longTreatment);
      return newLongTreatment;
    });

    await Promise.all(promiseArrayLongTreatments);

    const finalAppointment = await getAppointmentById(newAppointment);

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
