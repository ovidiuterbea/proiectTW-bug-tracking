const express = require("express");

const bugController = require("../controllers/bug-controllers");

const router = express.Router();

router.get("/project/:projectid", bugController.getBugsByProjectId);

router.post("/project/:projectid", bugController.createBug);

router.delete("/bug/:bugid", bugController.deleteBug);

router.patch("/bug/:bugid", bugController.updateStatus);

router.get("/bug/:bugid", bugController.getBugById);

router.get("/user/:userid", bugController.getBugsByUserId);

module.exports = router;
