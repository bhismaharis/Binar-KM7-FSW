const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
    if (req.query.year) {
        req.query.year = parseInt(req.query.year);
    } else {
        req.query.year = undefined;
    }
    
    const validateQuery = z.object({
        manufacture: z.string().optional(),
        model: z.string().optional(),
        type: z.string().optional(),
        year: z.number().int().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    next();
};

exports.validateCreateCar = (req, res, next) => {
    req.body = {
        ...req.body,
        rentPerDay: parseInt(req.body.rentPerDay),
        capacity: parseInt(req.body.capacity),
        available: req.body.available === "true" ? true : false,
        year: parseInt(req.body.year)
    }

    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
        rentPerDay: z.number().positive(),
        capacity: z.number().int().positive(),
        description: z.string(),
        availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        transmission: z.string(),
        available: z.boolean(),
        type: z.string(),
        year: z.number().int().positive(),
        options: z.array(z.string()).nonempty(),
        specs: z.array(z.string()).nonempty(),
    });

    const validateFileBody = z
        .object({
            image: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .optional()
                .nullable(),
        })
        .optional()
        .nullable();

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    const resultValidateFileBody = validateFileBody.safeParse(req.files);
    if (!resultValidateFileBody.success) {
        throw new BadRequestError(resultValidateFileBody.error.errors);
    }
    
    next();
};

exports.validateUpdateCar = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    req.body = {
        ...req.body,
        rentPerDay: parseInt(req.body.rentPerDay),
        capacity: parseInt(req.body.capacity),
        available: req.body.available === "true" ? true : false,
        year: parseInt(req.body.year)
    };

    const validateBody = z.object({
        plate: z.string().optional(),
        manufacture: z.string().optional(),
        model: z.string().optional(),
        rentPerDay: z.number().positive().optional(),
        capacity: z.number().int().positive().optional(),
        description: z.string().optional(),
        availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }).optional(),
        transmission: z.string().optional(),
        available: z.boolean().optional(),
        type: z.string().optional(),
        year: z.number().int().positive().optional(),
        options: z.array(z.string()).nonempty().optional(),
        specs: z.array(z.string()).nonempty().optional(),
    });

    const validateFileBody = z
        .object({
            image: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .optional()
                .nullable(),
        })
        .optional()
        .nullable();

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    const resultValidateFileBody = validateFileBody.safeParse(req.files);
    if (!resultValidateFileBody.success) {
        throw new BadRequestError(resultValidateFileBody.error.errors);
    }

    next();
};

exports.validateDeleteCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    next();
};

