const express = require('express');
const carsRouter = require('./cars.routes');

const router = express.Router();

router.use('/cars', carsRouter);

module.exports = router;