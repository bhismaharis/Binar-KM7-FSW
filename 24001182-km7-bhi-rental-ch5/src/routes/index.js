const express = require("express");

const carsRouter = require("./cars.routes");
const manufacturesRouter = require("./manufactures.routes");
const typesRouter = require("./types.routes");
const authRouter = require("./auth.routes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/types", typesRouter);
router.use("/cars", carsRouter);
router.use("/manufactures", manufacturesRouter);

module.exports = router;
