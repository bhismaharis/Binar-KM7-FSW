const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { BadRequestError, Unauthorized } = require("../utils/request");
const usersRepository = require("../repositories/users");

exports.authorizations =
    (...roles) =>
    async (req, res, next) => {
        const authorizationsHeader = req.header("authorization");
        if (!authorizationsHeader) {
            throw new Unauthorized("You need to login in advance!");
        }

        const splittedAuthHeader = authorizationsHeader.split(" ");
        if (splittedAuthHeader.length <= 1) {
            throw new Unauthorized("Token is not valid");
        }

        const token = splittedAuthHeader[1];

        const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await usersRepository.getUserById(extractedToken.user_id);

        const accessValidation = roles.includes(user.role_id);
        if (!accessValidation) {
            throw new Unauthorized("You can't access this resource");
        }

        req.user = user;

        next();
    };

exports.validateRegister = (req, res, next) => {
    const validateBody = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }
    next();
};

exports.validateAdmin = (req, res, next) => {
    const validateBody = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const validateBody = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};
