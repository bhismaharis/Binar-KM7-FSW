const express = require("express");
const {
    validateRegister,
    validateAdmin,
    validateLogin,
    authorizations,
} = require("../middlewares/auth.middlewares");
const {
    register,
    addAdmin,
    login,
    getProfile,
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/addadmin", authorizations(1), validateAdmin, addAdmin);
router.post("/login", validateLogin, login);
router.get("/profile", authorizations(1, 2, 3), getProfile);

module.exports = router;
