const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Project = require("../models/project");
const Bug = require("../models/bug");
const User = require("../models/user");

// TESTAT
const createBug = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, severity, priority, commit } = req.body;

  const projectId = req.params.projectid;

  let searchedProject;
  try {
    searchedProject = await Project.findById(projectId).populate("users");
  } catch (err) {
    const error = new HttpError(
      "Getting the project for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!searchedProject) {
    const error = new HttpError("Could not find project for provided id", 404);
    return next(error);
  }

  const bug = new Bug({
    description,
    severity,
    priority,
    commit,
    status: "UNRESOLVED",
    project: projectId,
    user: null,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await bug.save({ session: sess });
    await searchedProject.bugs.push(bug);
    await searchedProject.save({ session: sess });
    for (let user of searchedProject.users) {
      newUser = await User.findById(user);
      await newUser.bugs.push(bug);
      await newUser.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating bug failed, please try again.", 500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({
    bug: bug.toObject({ getters: true }),
  });
};

// TESTAT
const getBugsByProjectId = async (req, res, next) => {
  const projectId = req.params.projectid;

  let projectWithBugs;
  try {
    projectWithBugs = await Project.findById(projectId).populate("bugs");
  } catch (err) {
    const error = new HttpError(
      "Fetching project failed, please try again later",
      500
    );
    return next(error);
  }

  if (!projectWithBugs || projectWithBugs.bugs.length === 0) {
    return next(
      new HttpError("Could not find bugs for the provided project id.", 404)
    );
  }

  res.json({
    bugs: projectWithBugs.bugs.map((bug) => bug.toObject({ getters: true })),
  });
};

const deleteBug = async (req, res, next) => {
  const bugId = req.params.bugid;

  let bug;
  try {
    bug = await Bug.findById(bugId).populate("project");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the bug.",
      500
    );
    return next(error);
  }

  if (!bug) {
    const error = new HttpError("Could not find bug for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await bug.remove({ session: sess });
    bug.project.bugs.pull(bug);
    await bug.project.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete bug.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted bug." });
};

//TESTAT
const updateStatus = async (req, res, next) => {
  const bugId = req.params.bugid;

  let bug;
  try {
    bug = await Bug.findById(bugId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the bug.",
      500
    );
    return next(error);
  }

  bug.status = "RESOLVED";

  try {
    await bug.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the bug.",
      500
    );
    return next(error);
  }

  res.status(200).json({ bug: bug.toObject({ getters: true }) });
};

const updateAlocatedUser = async (req, res, next) => {
  const bugId = req.params.bugid;
  const { userId } = req.body;

  let bug;
  try {
    bug = await Bug.findById(bugId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the bug.",
      500
    );
    return next(error);
  }

  bug.user = userId;

  try {
    await bug.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the alocated user of the bug.",
      500
    );
    return next(error);
  }

  res.status(200).json({ bug: bug.toObject({ getters: true }) });
};

const getBugsByUserId = async (req, res, next) => {
  const userId = req.params.userid;

  let userWithBugs;
  try {
    userWithBugs = await User.findById(userId).populate("bugs");
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithBugs || userWithBugs.bugs.length === 0) {
    return next(
      new HttpError("Could not find bugs for the provided user id.", 404)
    );
  }

  res.json({
    bugs: userWithBugs.bugs.map((bug) => bug.toObject({ getters: true })),
  });
};

const getBugById = async (req, res, next) => {
  const bugId = req.params.bugid;

  let bug;
  try {
    bug = await Bug.findById(bugId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a bug.",
      500
    );
    return next(error);
  }

  if (!bug) {
    const error = new HttpError(
      "Could not find a bug for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ bug: bug.toObject({ getters: true }) });
};

exports.createBug = createBug;
exports.getBugsByProjectId = getBugsByProjectId;
exports.deleteBug = deleteBug;
exports.updateStatus = updateStatus;
exports.getBugsByUserId = getBugsByUserId;
exports.getBugById = getBugById;
exports.updateAlocatedUser = updateAlocatedUser;
