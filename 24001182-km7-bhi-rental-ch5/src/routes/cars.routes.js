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
    deleteCarById,
    createCar,
    updateCar,
} = require("../controllers/cars.controllers");
const { authorizations } = require("../middlewares/auth.middlewares");

const router = express.Router();

router
    .route("/")
    .get(authorizations(1, 2, 3), validateGetCars, getCars)
    .post(authorizations(1, 2), validateCreateCar, createCar);

router
    .route("/:id")
    .get(authorizations(1, 2, 3), validateGetCarById, getCarById)
    .delete(authorizations(1, 2), validateDeleteCarById, deleteCarById)
    .put(authorizations(1, 2), validateUpdateCar, updateCar);
    
module.exports = router;
