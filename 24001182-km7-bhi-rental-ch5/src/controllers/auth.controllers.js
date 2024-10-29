const authServices = require("../services/auth.services");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
    const data = await authServices.register(req.body);
    successResponse(res, data);
};

exports.addAdmin = async (req, res, next) => {
    const data = await authServices.addAdmin(req.body);
    successResponse(res, data);
}

exports.login = async (req, res, next) => {
    const data = await authServices.login(req.body);
    successResponse(res, data);
};

exports.getProfile = async (req, res, next) => {
    const data = req.user;
    delete data.password;
    successResponse(res, data);
};
