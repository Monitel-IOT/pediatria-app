const { allSymptoms } = require('../services/symptom.service');

const getAllSymptomsHandler = async (req, res, next) => {
  try {
    const diagnoses = await allSymptoms();
    res.status(200).json({
      data: diagnoses,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSymptomsHandler,
};
