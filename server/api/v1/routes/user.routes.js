const express = require('express');
// const authenticate = require('../../../middleware/authenticate');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.delete('/:id', userController.deleteUserByIdHandler);
router.get('/:id', userController.getUserByIdHandler);
router.put('/:id', userController.updateUserByIdHandler);
router.get('', userController.getAllUsersHandler);
router.post('', userController.createNewUserHandler);
router.get('/firebase/:firebaseId', userController.getUserByFirebaseIdHandler);

module.exports = router;
