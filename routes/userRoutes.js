const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);
    
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)



module.exports = router;