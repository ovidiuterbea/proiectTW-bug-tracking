const express = require("express");
const checkAuth = require("../middleware/check-auth");

const bugController = require("../controllers/bug-controllers");

const router = express.Router();

router.use(checkAuth);

router.get("/project/:projectid", bugController.getBugsByProjectId);

router.post("/project/:projectid", bugController.createBug);

router.delete("/bug/:bugid", bugController.deleteBug);

router.patch("/bug/:bugid", bugController.updateStatus);

router.patch("/bug/updateUser/:bugid", bugController.updateAlocatedUser);

router.get("/bug/:bugid", bugController.getBugById);

router.get("/user/:userid", bugController.getBugsByUserId);

module.exports = router;
