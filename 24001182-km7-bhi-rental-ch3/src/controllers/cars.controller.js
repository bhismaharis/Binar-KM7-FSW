const carServices = require("../services/cars.services");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res) => {
    const data = await carServices.getCars(
        req.query?.manufacture,
        req.query?.model,
        req.query?.type,
        req.query?.year
    );
    successResponse(res, data);
};

exports.getCarById = async (req, res) => {
    const { id } = req.params;
    const data = await carServices.getCarById(id);
    successResponse(res, data);
};

exports.createCar = async (req, res) => {
    const data = await carServices.createCar(req.body, req.files?.image);
    successResponse(res, data);
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const data = await carServices.updateCar(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarById = (req, res) => {
    const { id } = req.params;
    const data = carServices.deleteCarById(id);
    successResponse(res, data);
};
