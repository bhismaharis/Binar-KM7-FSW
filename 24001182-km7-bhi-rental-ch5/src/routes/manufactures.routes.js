const express = require('express');
const {
    validateGetAll,
    validateGetById,
    validateCreate,
    validateUpdate,
    validateDelete,
} = require('../middlewares/manufactures.middlewares');
const {
    getAll,
    getById,
    create,
    update,
    delete: deleteManufacture,
} = require('../controllers/manufactures.controllers');
const { authorizations } = require('../middlewares/auth.middlewares');

const router = express.Router();

router
    .route('/')
    .get(authorizations(1, 2, 3), validateGetAll, getAll)
    .post(authorizations(1, 2), validateCreate, create);

router
    .route('/:id')
    .get(authorizations(1, 2, 3), validateGetById, getById)
    .put(authorizations(1, 2), validateUpdate, update)
    .delete(authorizations(1, 2), validateDelete, deleteManufacture);
    
module.exports = router;
