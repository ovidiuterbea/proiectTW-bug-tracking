const express = require("express");
const { check } = require("express-validator");

const bugController = require("../controllers/bug-controllers");

const router = express.Router();

router.get("/project/:projectid", bugController.getBugsByProjectId);

router.post("/project/:projectid", bugController.createBug);

router.delete("/project/:projectid", bugController.deleteBug);

router.patch("/bug/:bugid", bugController.updateStatus);

router.get("/user/:userid", bugController.getBugsByUserId);

module.exports = router;
