const cars = require("../../data/cars.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { NotFoundError } = require("../utils/request");

exports.getCars = (manufacture, model, type, year) => {
    if (!manufacture && !model && !type && !year) {
        return cars;
    }

    const searchedCar = cars.filter((car) => {
        let result = true;
        if (manufacture) {
            const isFoundManufacture = car.manufacture
                .toLowerCase()
                .includes(manufacture.toLowerCase());
            result = result && isFoundManufacture;
        }
        if (model) {
            const isFoundModel = car.model
                .toLowerCase()
                .includes(model.toLowerCase());
            result = result && isFoundModel;
        }
        if (type) {
            const isFoundType = car.type
                .toLowerCase()
                .includes(type.toLowerCase());
            result = result && isFoundType;
        }
        if (year) {
            const isFoundYear = car.year === year;
            result = result && isFoundYear;
        }
        return result;
    });
    return searchedCar;
};

exports.getCarById = (id) => {
    const car = cars.find((car) => car.id == id);
    return car;
};

exports.createCar = (data) => {
    const newCar = {
        id: uuidv4(),
        ...data,
    };
    cars.push(newCar);
    fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 2));
    return newCar;
};

exports.updateCar = (id, data) => {
    const index = cars.findIndex((car) => car.id == id);
    if (index !== -1) {
        cars.splice(index, 1, {
            ...cars[index],
            ...data,
        });
    } else {
        throw new NotFoundError("Car is Not Found!");
    }

    Object.assign(cars[index], data);

    fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 2));
    return cars[index];
};

exports.deleteCarById = (id) => {
    const foundIndex = cars.findIndex((car) => car.id == id);
    if (foundIndex < 0) {
        throw new NotFoundError("Car is Not Found!");
    }
    const deletedCar = cars.splice(foundIndex, 1)[0];
    fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 2));
    return deletedCar;
};
