const express = require("express");
const { check } = require("express-validator");

const projectController = require("../controllers/project-controllers");

const router = express.Router();

router.get("/", projectController.getProjects);

router.get("/:projectid", projectController.getProjectById);

router.get("/user/:userid", projectController.getProjectsByUserId);

router.post("/", projectController.createProject);

module.exports = router;
