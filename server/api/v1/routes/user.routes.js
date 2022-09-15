const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id/patients', userController.getAllPatientsByUserIdHandler);
router.delete('/:id', userController.deleteUserByIdHandler);
router.get('/:id', userController.getUserByIdHandler);
router.put('/:id', userController.updateUserByIdHandler);
router.get('', userController.getAllUsersHandler);
router.post('', userController.createNewUserHandler);

module.exports = router;
