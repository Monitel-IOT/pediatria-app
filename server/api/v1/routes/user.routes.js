const express = require('express');
const authenticate = require('../../../middleware/authenticate');
// const authenticate = require('../../../middleware/authenticate');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.delete('/:id', userController.deleteUserByIdHandler);
router.get('/:id', userController.getUserByIdHandler);
router.put('/:id', authenticate, userController.updateUserByIdHandler);
router.get('', userController.getAllUsersHandler);
router.post('', userController.createNewUserHandler);
router.get('/firebase/:firebaseId', authenticate, userController.getUserByFirebaseIdHandler);

module.exports = router;
