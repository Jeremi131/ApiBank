const express = require('express');
const tranferController = require('../controllers/transfer.controller');

const routerTranfer = express.Router();

routerTranfer.post('/', tranferController.sendTranfer);

module.exports = routerTranfer;
