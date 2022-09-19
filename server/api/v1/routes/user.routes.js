const express = require('express');
const authenticate = require('../../../middleware/authenticate');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/:id/patients', userController.getAllPatientsByUserIdHandler);
router.delete('/:id', userController.deleteUserByIdHandler);
router.get('/:id', userController.getUserByIdHandler);
router.put('/:id', userController.updateUserByIdHandler);
router.get('', authenticate, userController.getAllUsersHandler);
router.post('', userController.createNewUserHandler);

module.exports = router;
