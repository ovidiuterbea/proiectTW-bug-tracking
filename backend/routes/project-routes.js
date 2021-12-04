const express = require("express");
const checkAuth = require("../middleware/check-auth");

const projectController = require("../controllers/project-controllers");

const router = express.Router();

router.use(checkAuth);

router.get("/", projectController.getProjects);

router.get("/:projectid", projectController.getProjectById);

router.get("/user/:userid", projectController.getProjectsByUserId);

router.post("/", projectController.createProject);

module.exports = router;
