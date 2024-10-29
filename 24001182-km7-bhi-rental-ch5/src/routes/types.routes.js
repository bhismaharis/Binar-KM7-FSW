const express = require("express");
const {
    validateGetTypes,
    validateGetTypeById,
    validateDeleteTypeById,
    validateCreateType,
    validateUpdateType,
} = require("../middlewares/types.middlewares");
const {
    getTypes,
    getTypeById,
    deleteTypeById,
    createType,
    updateType,
} = require("../controllers/types.controllers");
const { authorizations } = require("../middlewares/auth.middlewares");

const router = express.Router();

router
    .route("/")
    .get(authorizations(1, 2, 3), validateGetTypes, getTypes)
    .post(authorizations(1, 2), validateCreateType, createType);

router
    .route("/:id")
    .get(authorizations(1, 2, 3), validateGetTypeById, getTypeById)
    .delete(authorizations(1, 2), validateDeleteTypeById, deleteTypeById)
    .put(authorizations(1, 2), validateUpdateType, updateType);

module.exports = router;
