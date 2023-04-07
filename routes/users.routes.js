const userController = require('../controllers/users.controller');
const express = require('express');

const routerUser = express.Router();

routerUser.post('/singup', userController.signup);
routerUser.post('/login', userController.login);
routerUser.get('/:id/history', userController.findOneUser);

module.exports = routerUser;
