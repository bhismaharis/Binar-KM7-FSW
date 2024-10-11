const carsRepository = require("../repositories/cars.repositories");
const { NotFoundError, BadRequestError } = require("../utils/request");
const { imageUpload } = require("../utils/imageHandler");

exports.getCars = async (manufacture, model, type, year) => {
    const data = carsRepository.getCars(manufacture, model, type, year);
    if (data.length === 0) {
        throw new NotFoundError("Cars are Not Found!");
    }
    return data;
};

exports.getCarById = async (id) => {
    const data = carsRepository.getCarById(id);
    if (!data) {
        throw new NotFoundError("Car is Not Found!");
    }
    return data;
};

exports.createCar = async (data, files) => {
    if (files == null) {
        files = { filename: null };
    }

    if (files?.image) {
        data.image = await imageUpload(files.image);
    }
    return carsRepository.createCar(data);
};

exports.updateCar = async (id, data, files) => {
    const existingCar = carsRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    data = {
        ...existingCar,
        ...data,
    };

    // let file = files?.image;

    if (files == null) {
        data = { filename: null };
    }

    if (files?.image) {
        data.image = await imageUpload(files.image);
    }

    const updatedCar = carsRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new BadRequestError("Failed to update car!");
    }
    return updatedCar;
};

exports.deleteCarById = (id) => {
    const existingCar = carsRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = carsRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new BadRequestError("Failed to delete car!");
    }
    return deletedCar;
};
