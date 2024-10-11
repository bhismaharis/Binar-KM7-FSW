const express = require("express");
const {
    validateGetCars,
    validateGetCarById,
    validateDeleteCarById,
    validateCreateCar,
    validateUpdateCar,
} = require("../middlewares/cars.middlewares");
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCarById,
} = require("../controllers/cars.controller");

const router = express.Router();

router
    .route("/")
    .get(validateGetCars, getCars)
    .post(validateCreateCar, createCar);
router
    .route("/:id")
    .get(validateGetCarById, getCarById)
    .put(validateUpdateCar, updateCar)
    .delete(validateDeleteCarById, deleteCarById);

module.exports = router;
