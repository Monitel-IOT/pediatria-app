const { allSymptoms } = require('../services/symptom.service');

const getAllSymptomsHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const symptoms = await allSymptoms(id);

    res.status(200).json({
      data: symptoms,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSymptomsHandler,
};
